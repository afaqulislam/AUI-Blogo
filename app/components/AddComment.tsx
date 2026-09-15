"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface Props {
  postId: string;
}

const AddComment = ({ postId }: Props) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { name, email, comment } = data;

    setStatus("idle");
    setFeedback("");

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, comment, postId }),
      });

      if (!res.ok) {
        let message = "Unable to submit your comment. Please try again.";
        try {
          const body = await res.json();
          if (typeof body?.message === "string" && body.message) {
            message = body.message;
          }
        } catch {
          // response not parseable — fall back to the default message
        }
        setFeedback(message);
        setStatus("error");
        return;
      }

      reset();
      setFeedback("Comment submitted successfully!");
      setStatus("success");
    } catch {
      setFeedback("Unable to submit your comment. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="mt-1">
      <p>
        Leave a comment <span aria-hidden="true">💬</span>
      </p>
      {status === "success" && (
        <p
          role="status"
          className="text-green-600 dark:text-green-400 text-sm mt-3 mb-2 font-medium"
        >
          {feedback}
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="text-red-600 dark:text-red-400 text-sm mt-3 mb-2 font-medium"
        >
          {feedback}
        </p>
      )}
      <form
        className="flex flex-col mt-4 border dark:border-purple-950 shadow-sm rounded px-8 pt-6 pb-6 mb-10"
        noValidate
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <label htmlFor="comment-name">Name</label>
        <input
          id="comment-name"
          {...register("name", { required: true })}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "comment-name-error" : undefined}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.name && (
          <p id="comment-name-error" className="text-red-600 text-xs">
            Name is required.
          </p>
        )}
        <label htmlFor="comment-email">
          Email{" "}
          <span className="text-xs">(Your email will not be published!)</span>
        </label>
        <input
          id="comment-email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "comment-email-error" : undefined}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.email && (
          <p id="comment-email-error" className="text-red-600 text-xs">
            Please enter a valid email address.
          </p>
        )}
        <label htmlFor="comment-text">Comment</label>
        <textarea
          id="comment-text"
          {...register("comment", { required: true, minLength: 2 })}
          aria-invalid={errors.comment ? true : undefined}
          aria-describedby={errors.comment ? "comment-text-error" : undefined}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.comment && (
          <p id="comment-text-error" className="text-red-600 text-xs">
            Minimum 2 characters.
          </p>
        )}
        <input
          className={`cursor-pointer bg-purple-500 text-white rounded py-2 hover:bg-purple-600 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting..." : "Submit"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddComment;
