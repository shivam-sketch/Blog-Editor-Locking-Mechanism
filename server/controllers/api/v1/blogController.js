import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  HTTP_CONFLICT,
  HTTP_CREATED,
  HTTP_FORBIDDEN,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_UNAUTHORIZED,
} from "../../../config/HttpCodes.js";
import HttpResponse from "../../../utils/apiResponses/HttpResponse.js";
import {
  AuthorizeError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../../exceptions/app-exceptions.js";
import { passwordHasher } from "../../../utils/helper.js";
import UserModel from "../../../Model/User.model.js";

import BlogsModel from "../../../Model/Blogs.model.js";
export async function addBlog(req, res, next) {
  try {
    const book = new BlogsModel(req.body);
    await book.save();
    return HttpResponse.sendAPIResponse(
      res,
      book,
      HTTP_CREATED,
      "Blog Added Successful."
    );
  } catch (error) {
    console.log("err", error);
    next(error);
  }
}

export async function updateBlog(req, res, next) {
  try {
    const { id, title, content } = req.body;

    let blog = await BlogsModel.findById(id);

    // Check if the blog is locked by another user
    if (blog.isLocked && blog.lockedBy.toString() !== req.user.id) {
      throw new ForbiddenError("This Blog Is Being Edited By Another User");
    }

    // Lock the blog if not already locked by the same user
    if (!blog.isLocked || blog.lockedBy.toString() === req.user.id) {
      blog.isLocked = true;
      blog.lockedBy = req.user.id;
      blog.lockedAt = new Date();
    }

    blog.title = title;
    blog.content = content;
    blog.lastEditedBy = req.user.id;
    await blog.save();

    return HttpResponse.sendAPIResponse(
      res,
      blog,
      HTTP_OK,
      "Blog Updated Successfully"
    );
  } catch (error) {
    console.log("err", error);
    next(error);
  }
}

export async function getBlog(req, res, next) {
  try {
    const books = await BlogsModel.find({}).populate("lastEditedBy", "name");

    return HttpResponse.sendAPIResponse(
      res,
      books,
      HTTP_CREATED,
      "Blogs Fetched Successfuly."
    );
  } catch (error) {
    console.log("err", error);
    next(error);
  }
}



export async function getBlogById(req, res, next) {
  try {
    const { id } = req.params;

    const blog = await BlogsModel.findOne({ _id: id });
    return HttpResponse.sendAPIResponse(
      res,
      blog,
      HTTP_OK,
      "Blogs Fetched Successfuly"
    );
  } catch (error) {
    console.log("err", error);
    next(error);
  }
}
