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

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
} from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
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

const formSchema = z.object({
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
      scheduledAt: "",
      isAutoSchedule: false,
      campaignId: "",
      labelIds: [],
      needsApproval: false,
      overrides: [],
      threads: [],
    },
  });

  const { handleSubmit, control, watch } = form;
  const watchMediaIds = watch("mediaIds");

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
      console.log("🚀 ~ file: page.tsx:148 ~ .onError ~ error:", error);
      showToast(
        error?.response?.data?.message || "Failed to create post",
        "error",
      );
    },
  });

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
      // overrides: data.overrides,
      // threads: data.threads,
    };
    await createPost({
      data: payload,
      workspaceId: lastWorkspace!,
    });
  }

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
                    <FormMessage />
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
