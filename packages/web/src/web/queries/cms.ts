import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc, client } from "../lib/api";
export type Project = Awaited<ReturnType<typeof client.caseStudy.adminList>>[number];
export function usePublicProjects() {
  return useQuery(orpc.caseStudy.list.queryOptions());
}
export function useCaseStudy(slug: string) {
  return useQuery(orpc.caseStudy.get.queryOptions({ input: { slug } }));
}
export function useAdminProjects() {
  return useQuery(orpc.caseStudy.adminList.queryOptions());
}
export function useProjectPreview(id: number) {
  return useQuery(orpc.caseStudy.preview.queryOptions({ input: { id } }));
}
export function useSaveProject() {
  const qc = useQueryClient();
  return useMutation(
    orpc.caseStudy.save.mutationOptions({
      onSuccess: () => {
        void qc.invalidateQueries({ queryKey: orpc.caseStudy.key() });
      },
    }),
  );
}
export function useInbox() {
  return useQuery(orpc.inbox.list.queryOptions({ refetchInterval: 60_000 }));
}
export function useUpdateInquiry() {
  const qc = useQueryClient();
  const key = orpc.inbox.list.key();
  return useMutation(
    orpc.inbox.update.mutationOptions({
      onMutate: async (input) => {
        await qc.cancelQueries({ queryKey: key });
        const previous = qc.getQueryData(key);
        qc.setQueryData(key, (old: Awaited<ReturnType<typeof client.inbox.list>> | undefined) =>
          old?.map((i) => (i.id === input.id ? { ...i, ...input } : i)),
        );
        return { previous };
      },
      onError: (_error, _input, context) => {
        qc.setQueryData(key, context?.previous);
      },
      onSettled: () => {
        void qc.invalidateQueries({ queryKey: orpc.inbox.key() });
      },
    }),
  );
}
export function useImageUpload() {
  return useMutation({
    mutationFn: async (file: File) => {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
        throw new Error("Choose a JPG, PNG, or WebP image.");
      if (file.size > 10 * 1024 * 1024) throw new Error("Images must be smaller than 10 MB.");
      const { url, publicUrl } = await client.upload.presign({
        contentType: file.type as "image/jpeg" | "image/png" | "image/webp",
        size: file.size,
      });
      const response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type, "x-amz-acl": "public-read" },
      });
      if (!response.ok) throw new Error("Image upload failed. Please try again.");
      return publicUrl;
    },
  });
}
