import BlogsModel from "../../Model/Blogs.model.js";

export const unblockStaleBlogs = async () => {
  const timeout = parseInt(process.env.LOCK_TIMEOUT, 10);

  try {
    const blogs = await BlogsModel.find({ isLocked: true });

    blogs.forEach(async (blog) => {
      const currentTime = new Date().getTime();
      const lockedTime = new Date(blog.lockedAt).getTime();

      if (currentTime - lockedTime > timeout) {
        blog.isLocked = false;
        blog.lockedBy = null;
        blog.lockedAt = null;
        await blog.save();
        console.log(`Unlocked blog: ${blog.title}`);
      }
    });
  } catch (err) {
    console.error("Error unlocking stale blogs:", err);
  }
};
