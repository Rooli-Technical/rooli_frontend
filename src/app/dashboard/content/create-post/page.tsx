"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import workSpaceService from "@/services/workspace.service";
import { useAppStore } from "@/store/app-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { format } from "date-fns";

import * as z from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { MediaUpload } from "@/components/ui/media-upload";
import { IconType } from "react-icons/lib";
import { CreatePostPayload, SocialAccountProps } from "@/types";
import useToast from "@/components/app-toast";
import postService from "@/services/post.service";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import { Spinner } from "@/components/ui/spinner";
import { cn, splitTextByCharacters } from "@/lib/utils";

const formSchema = z
  .object({
    content: z.string().min(1, { message: "Content is required" }),
    contentType: z.enum(["POST", "REEL", "STORY", "THREAD"]),
    socialProfileIds: z
      .array(z.string())
      .min(1, { message: "Social profile is required" }),
    mediaIds: z.array(z.string()).optional(),
    timezone: z.string().min(2, { message: "Timezone is required" }),
    scheduledAt: z.string(),
    isAutoSchedule: z.boolean().optional(),
    campaignId: z.string().optional(),
    labelIds: z.array(z.string()).optional(),
    needsApproval: z.boolean().optional(),
    overrides: z
      .array(
        z.object({
          socialProfileId: z.string(),
          content: z.string(),
        }),
      )
      .optional(),
    threads: z
      .array(
        z.object({
          content: z.string(),
          mediaIds: z.array(z.string()).optional(),
          targetProfileIds: z.array(z.string()).optional(),
        }),
      )
      .optional(),
  })
  .refine((data) => {
    const isTwitter = !!data.socialProfileIds.find((id) => {
      return true;
    });
    return true;
  });

const CONTENT_TYPES = [
  { value: "POST", label: "Post" },
  { value: "REEL", label: "Reel" },
  { value: "STORY", label: "Story" },
  { value: "THREAD", label: "Thread" },
];

const TIMEZONES = [
  { value: "Africa/Lagos", label: "West Africa Time (WAT)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
];

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
  const { lastWorkspace } = useAppStore();
  const queryClient = useQueryClient();
  const showToast = useToast();
  const router = useProgressBarRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      contentType: "POST",
      socialProfileIds: [],
      mediaIds: [],
      timezone: "",
      scheduledAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      isAutoSchedule: false,
      campaignId: "",
      labelIds: [],
      needsApproval: false,
      overrides: [],
      threads: [],
    },
  });

  const { handleSubmit, control, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "threads",
  });
  const {
    fields: overrideFields,
    append: overrideAppend,
    remove: overrideRemove,
  } = useFieldArray({
    control,
    name: "overrides",
  });

  const socialProfileIds = watch("socialProfileIds");
  const mainContent = watch("content");

  const { isLoading: profilesLoading, data: socialProfiles } = useQuery({
    queryKey: ["get-workspace-profiles"],
    queryFn: async () => {
      if (lastWorkspace) {
        const response =
          await workSpaceService.getWorkspaceSocialProfiles(lastWorkspace);

        return response?.data;
      }
    },
    enabled: !!lastWorkspace,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: createPost, isPending } = useMutation({
    mutationKey: ["create-workspace-post"],
    mutationFn: async (payload: {
      data: CreatePostPayload;
      workspaceId: string;
    }) => {
      const response = await postService.createWorkspacePost(
        payload.workspaceId,
        payload.data,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-posts", lastWorkspace],
      });
      showToast("Post created successfully", "success");
      router.push(`/dashboard/content`);
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to create post",
        "error",
      );
    },
  });

  const twitterProfile = socialProfiles?.find(
    (p: SocialAccountProps) =>
      socialProfileIds.includes(p.id) && p.platform === "TWITTER",
  );

  const twitterId = watch("socialProfileIds").find((id) => {
    const profile = socialProfiles?.find(
      (p: SocialAccountProps) => p.id === id,
    );
    return profile?.platform === "TWITTER";
  });

  const maxChars = twitterProfile ? 280 : 1000;
  const currentCharCount = mainContent.length;

  async function onSubmit(data: FormSchema) {
    const payload: CreatePostPayload = {
      content: data.content,
      contentType: data.contentType,
      socialProfileIds: data.socialProfileIds,
      mediaIds: data.mediaIds,
      timezone: data.timezone,
      scheduledAt: data.scheduledAt,
      isAutoSchedule: data.isAutoSchedule,
      // campaignId: data.campaignId,
      // labelIds: data.labelIds,
      needsApproval: data.needsApproval,
      overrides: data.overrides,
      threads: twitterId
        ? data.threads?.map((thread) => ({
            ...thread,
            targetProfileIds: twitterId ? [twitterId] : [],
          }))
        : [],
    };

    console.log("🚀 ~ file: page.tsx:192 ~ payload:", payload);
    await createPost({
      data: payload,
      workspaceId: lastWorkspace!,
    });
  }

  useEffect(() => {
    if (twitterProfile && currentCharCount > 280) {
      const chunks = splitTextByCharacters(mainContent, 280);

      // Update main content to the first chunk
      form.setValue("content", chunks[0]);

      // Move remaining chunks to threads
      const threadChunks = chunks.slice(1);

      const currentThreads = form.getValues("threads") || [];
      const newThreads = threadChunks.map((content, index) => {
        const existingThread = currentThreads[index];
        return {
          content,
          mediaIds: existingThread?.mediaIds || [],
          targetProfileIds: [twitterProfile.id],
        };
      });

      form.setValue("threads", newThreads);
    }
  }, [mainContent, twitterProfile, currentCharCount, form]);

  return (
    <div className="w-full">
      <Card className="max-w-3xl xl:max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold md:text-3xl">
            Create New Post
          </CardTitle>
          <CardDescription>
            Schedule posts across your social profiles
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">Content</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-input border-border resize-none min-h-[90px]"
                        placeholder="Enter content on your post"
                      />
                    </FormControl>
                    <div className="flex flex-col justify-between mt-1">
                      <FormMessage />
                      {twitterId && (
                        <FormDescription className="text-[10px] text-orange-500 font-medium">
                          Content is being sliced into threads. Use content
                          override for more control.
                        </FormDescription>
                      )}
                      <span
                        className={cn(
                          "text-[10px] font-medium",
                          currentCharCount > maxChars
                            ? "text-destructive"
                            : "text-muted-foreground",
                        )}
                      >
                        {currentCharCount}/{maxChars} characters
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="mediaIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">Media</FormLabel>
                    <FormControl>
                      <MediaUpload
                        value={field.value}
                        onChange={field.onChange}
                        workspaceId={lastWorkspace || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 w-full">
                <div className="w-full">
                  <FormField
                    control={control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Content Type
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full bg-input border-border">
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              {CONTENT_TYPES.map((contentType) => (
                                <SelectItem
                                  key={contentType.value}
                                  value={contentType.value}
                                >
                                  {contentType.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Timezone
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full bg-input border-border">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              {TIMEZONES.map((timezone) => (
                                <SelectItem
                                  key={timezone.value}
                                  value={timezone.value}
                                >
                                  {timezone.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={control}
                    name="scheduledAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Schedule At
                        </FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={control}
                name="socialProfileIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Social Profiles
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {socialProfiles?.map((profile: SocialAccountProps) => {
                          const PlatformIcon: IconType =
                            {
                              INSTAGRAM: FaInstagram,
                              TWITTER: FaXTwitter,
                              FACEBOOK: FaFacebook,
                              LINKEDIN: FaLinkedin,
                            }[profile?.platform] || FaInstagram;

                          return (
                            <Button
                              key={profile.id}
                              type="button"
                              variant={
                                field.value?.includes(profile.id)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                if (field.value?.includes(profile.id)) {
                                  field.onChange(
                                    field.value.filter(
                                      (id) => id !== profile.id,
                                    ),
                                  );
                                } else {
                                  field.onChange([...field.value, profile.id]);
                                }
                              }}
                            >
                              <PlatformIcon />
                              {profile.name}
                            </Button>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <FormLabel className="text-sm font-bold">
                      Override content
                    </FormLabel>
                    <p className="text-xs font-medium text-muted-foreground">
                      Override content for specific social profiles.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      overrideAppend({ content: "", socialProfileId: "" })
                    }
                    className="flex items-center gap-2"
                  >
                    <FaPlus className="w-3 h-3" />
                    Add Segment
                  </Button>
                </div>

                {overrideFields.map((field, index) => (
                  <Card key={field.id} className="p-4 border-dashed">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-muted-foreground">
                          Override {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => overrideRemove(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <FaTrash className="w-4 h-4" />
                        </Button>
                      </div>

                      <FormField
                        control={control}
                        name={`overrides.${index}.content`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="bg-input border-border resize-none min-h-[60px]"
                                placeholder={`Override #${index + 1} content`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`overrides.${index}.socialProfileId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-wrap gap-2">
                                {socialProfiles?.map(
                                  (profile: SocialAccountProps) => {
                                    const PlatformIcon: IconType =
                                      {
                                        INSTAGRAM: FaInstagram,
                                        TWITTER: FaXTwitter,
                                        FACEBOOK: FaFacebook,
                                        LINKEDIN: FaLinkedin,
                                      }[profile?.platform] || FaInstagram;

                                    return (
                                      <Button
                                        key={profile.id}
                                        type="button"
                                        variant={
                                          field.value?.includes(profile.id)
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() => {
                                          field.onChange(profile.id);
                                        }}
                                      >
                                        <PlatformIcon />
                                        {profile.name}
                                      </Button>
                                    );
                                  },
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              {twitterId && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <FormLabel className="text-sm font-bold">
                        Threads
                      </FormLabel>
                      <p className="text-xs font-medium text-muted-foreground">
                        Thread only works with twitter.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ content: "", mediaIds: [] })}
                      className="flex items-center gap-2"
                    >
                      <FaPlus className="w-3 h-3" />
                      Add Thread
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <Card key={field.id} className="p-4 border-dashed">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Thread #{index + 1}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <FaTrash className="w-3 h-3" />
                          </Button>
                        </div>

                        <FormField
                          control={control}
                          name={`threads.${index}.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="bg-input border-border resize-none min-h-[60px]"
                                  placeholder={`Thread #${index + 1} content`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`threads.${index}.mediaIds`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <MediaUpload
                                  value={field.value}
                                  onChange={field.onChange}
                                  workspaceId={lastWorkspace || ""}
                                  maxFiles={1}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full md:w-auto"
                >
                  {isPending ? <Spinner /> : null}
                  Create Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
