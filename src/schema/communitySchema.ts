import z from "zod"

export const CommunityValidator = z.object({
    name: z.string().min(1, "Please fill out this field"),
    description: z.string().min(1, "Please fill out this field")
})

export const CommunitySubscriptionValidator = z.object({
    id: z.string()
})

export type CreateCommunityPayload = z.infer<typeof CommunityValidator>
export type SupscribeToCommunityPayload = z.infer<typeof CommunitySubscriptionValidator>