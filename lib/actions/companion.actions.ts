"use server";

import { createSupabaseClient } from "../supebase";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: {
  name: string;
  subject: string;
  topic: string;
  voice: string;
  style: string;
  duration: number;
}) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create a companion");
  }

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: {
  limit?: number;
  page?: number;
  subject?: string | string[];
  topic?: string | string[];
}) => {
  const { userId } = await auth();

  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  // handle bookmarked
  const companionIds = companions.map(({ id }) => id);

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", userId)
    .in("companion_id", companionIds);

  const marks = new Set(bookmarks?.map(({ companion_id }) => companion_id));

  companions.forEach((companion) => {
    companion.bookmarked = marks.has(companion.id);
  });

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteCompanion = async (id: string, path: string) => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .delete()
    .eq("id", id)
    .eq("author", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(path);

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_active_companions" })) {
    limit = 3;
  } else if (has({ feature: "10_active_companions" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) {
    throw new Error(error.message);
  }

  const companionCount = data?.length;

  if (companionCount >= limit) {
    return false;
  } else {
    return true;
  }
};
export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(path);

  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(path);

  return data;
};

export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map(({ companions }) => companions);
};
