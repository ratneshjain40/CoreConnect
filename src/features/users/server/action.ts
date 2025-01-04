import { blogService } from "@/features/blog/server/service";
import { authActionClient } from "@/lib/action-clients";

export const getAllBlogsData = authActionClient.metadata({
    roleGate: "ADMIN"
}).action(async () => {
    return await blogService.getAllBlogsData();
});