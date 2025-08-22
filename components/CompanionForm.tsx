"use client";

import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBJECTS } from "@/constants";
import { createCompanion } from "@/lib/actions/companion.actions";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { error: "名称必填" }),
  subject: z.string().min(1, { error: "学科必填" }),
  topic: z.string().min(1, { error: "主题必填" }),
  voice: z.string().min(1, { error: "语音必填" }),
  style: z.string().min(1, { error: "风格必填" }),
  duration: z.coerce.number().min(1, { error: "时长必填" }),
});

const CompanionForm = () => {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setPending(true);

    const companion = await createCompanion(values);

    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      console.error("Failed to create a companion");
      redirect("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>伙伴名称</FormLabel>
              <FormControl>
                <Input
                  className="w-full border-black bg-white focus-visible:border-black focus-visible:ring-0"
                  placeholder="输入伙伴名称"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>学科</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full border-black bg-white focus-visible:border-black focus-visible:ring-0 capitalize">
                    <SelectValue placeholder="选择学科" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="capitalize"
                      >
                        {item.zh}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>伙伴应该在什么方面帮助你？</FormLabel>
              <FormControl>
                <Textarea
                  className="w-full border-black bg-white focus-visible:border-black focus-visible:ring-0"
                  placeholder="比如：导数与积分"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>语音</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full border-black bg-white focus-visible:border-black focus-visible:ring-0">
                    <SelectValue placeholder="选择语音" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">男性</SelectItem>
                    <SelectItem value="female">女性</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>风格</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full border-black bg-white focus-visible:border-black focus-visible:ring-0">
                    <SelectValue placeholder="选择风格" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">正式</SelectItem>
                    <SelectItem value="casual">放松</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>预计课程持续时间（分钟）</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="w-full border-black bg-white focus-visible:border-black focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full cursor-pointer disabled:animate-pulse disabled:cursor-not-allowed"
          disabled={pending}
          type="submit"
        >
          创建你的伙伴
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
