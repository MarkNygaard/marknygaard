import React, { ChangeEvent, FormEvent, useState } from 'react';
import { BsReply, BsPencil } from 'react-icons/bs';
import { HiOutlineTrash } from 'react-icons/hi';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEdit,
} from 'react-icons/ai';
import useSWR, { mutate } from 'swr';
import { signIn, signOut, useSession } from 'next-auth/react';
import { format, formatDistanceToNow } from 'date-fns';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';

interface Slug {
  slug: string;
}

interface CommentParams {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  payload: string;
  reply_of?: string;
  image: string;
  slug: string;
}

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' }).then((res) => res.json());

const addCommentRequest = (url: string, data: any) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export default function Comments({ slug }: Slug) {
  const { data: session } = useSession();
  const { data: commentList, error: commentListError } = useSWR<
    CommentParams[]
  >(`/api/comments/${slug}`, fetcher);
  const [comment, setComment] = useState<string>('');
  const [editComment, setEditComment] = useState({
    id: '',
    payload: '',
  });
  const [replyOf, setReplyOf] = useState<string | null>(null);

  const onChangeEditComment = (event: ChangeEvent<HTMLInputElement>) => {
    const payload = event.target.value;
    setEditComment({ ...editComment, payload });
  };

  //Edit Comment Request
  const editCommentRequest = (url: string, data: any) =>
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json());

  const confirmEdit = async () => {
    const editData = {
      payload: editComment.payload,
      commentId: editComment.id,
    };
    if (typeof commentList !== 'undefined') {
      mutate(
        'api/comments',
        commentList.map((comment) => {
          if (comment.id === editData.commentId) {
            return { ...comment, payload: editData.payload };
          }
        }),
        false
      );
      const response = await editCommentRequest('api/comments', editData);
      if (response[0].created_at) {
        mutate('api/comments');
        setEditComment({ id: '', payload: '' });
      }
    }
  };

  //Delete Comment Request
  const deleteCommentRequest = (url: string, id: string) =>
    fetch(`${url}?comment_id=${id}`, { method: 'DELETE' }).then((res) =>
      res.json()
    );

  const confirmDelete = async (id: string) => {
    const ok = window.confirm('Delete comment?');
    if (ok && typeof commentList !== 'undefined') {
      mutate(
        'api/comments',
        commentList.filter((comment) => comment.id !== id),
        false
      );
      const response = await deleteCommentRequest('api/comments', id);
      if (response[0].created_at) {
        mutate('api/comments');
      }
    }
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    setComment(commentValue);
  };

  // On Submit Request
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = {
      username: session?.user.name,
      payload: comment,
      reply_of: replyOf,
      image: session?.user.image,
    };
    if (typeof commentList !== 'undefined') {
      mutate('api/comments', [...commentList, newComment], false);
      const response = await addCommentRequest('api/comments', newComment);
      if (response[0].created_at) {
        mutate('api/comments');
        setComment('');
      }
    }
  };

  const [tooltip, showTooltip] = useState(true);

  return (
    <div className="pb-10 flex justify-center">
      <div className="min-w-[600px]">
        <div className="flex flex-col gap-4 pt-12">
          <div className="font-medium text-gray-500">
            {commentList ?? []
              ? commentList?.length == 1
                ? commentList?.length + ' comment'
                : commentList?.length + ' comments'
              : '0 comments'}
          </div>
          {(commentList ?? [])
            .sort((a, b) => {
              const aDate = new Date(a.created_at);
              const bDate = new Date(b.created_at);
              return +aDate - +bDate;
            })
            .map((comment) => (
              <div key={comment.id} className="flex">
                {/* <div className="mr-2">
                  {comment.image ? (
                    / * eslint-disable @next/next/no-img-element * /
                    <img
                      alt="profile picture"
                      className="rounded"
                      src={comment.image}
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] bg-slate-600 text-white rounded flex justify-center items-center text-2xl">
                      {comment.username.charAt(0)}
                    </div>
                  )}
                </div> */}
                <div className="border rounded-md border-gray-300 flex-1">
                  {comment.reply_of && (
                    <div className="flex items-center justify-start gap-2 p-1 bg-slate-200 border-b border-gray-900/10">
                      <BsReply className="w-4 text-gray-600 rotate-180" />
                      <p className="font-extralight italic text-gray-600 text-sm">
                        {commentList?.find((c) => c.id === comment.reply_of)
                          ?.payload ?? ''}
                      </p>
                    </div>
                  )}
                  <div className="before:content-[<] mb-2 font-semibold border-b border-gray-300 py-3 px-4 border-solid bg-slate-200 text-gray-600 text-sm">
                    <span>{comment.username}</span>
                    <span
                      className="font-light"
                      data-tip
                      data-for="date"
                      onMouseEnter={() => showTooltip(true)}
                      onMouseLeave={() => {
                        showTooltip(false);
                        setTimeout(() => showTooltip(true), 50);
                      }}
                    >
                      {' '}
                      commented{' '}
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                    {tooltip && (
                      <ReactTooltip
                        id="date"
                        place="bottom"
                        effect="solid"
                        backgroundColor="rgb(249 250 251)"
                        textColor="rgb(13 14 18)"
                        border={true}
                        borderColor="rgb(13 14 18, 0.5)"
                      >
                        {format(new Date(comment.created_at), 'dd MMMM yyyy')}
                      </ReactTooltip>
                    )}
                    {comment.updated_at !== comment.created_at && (
                      <span className="ml-4 px-1 float-right text-sm font-extralight border border-gray-400 rounded">
                        edited
                      </span>
                    )}
                    {comment.username === 'Mark Nygaard' ? (
                      <span className="ml-4 px-1 float-right text-sm font-extralight border border-gray-400 rounded">
                        Owner
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 justify-between pt-2 pb-5 px-4">
                    {comment.id === editComment.id ? (
                      <input
                        type="text"
                        value={editComment.payload}
                        onChange={onChangeEditComment}
                        className="pb-1 border-b w-full"
                      />
                    ) : (
                      <p className="font-light">{comment.payload}</p>
                    )}

                    <div className="flex gap-2">
                      {editComment.id === comment.id ? (
                        <>
                          <button
                            type="button"
                            onClick={confirmEdit}
                            disabled={editComment.payload === comment.payload}
                            title="Confirm"
                          >
                            <AiOutlineCheckCircle
                              className={`${
                                editComment.payload === comment.payload
                                  ? `text-gray-300`
                                  : `text-green-500`
                              } w-6`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditComment({ id: '', payload: '' })
                            }
                            title="Cancel"
                          >
                            <AiOutlineCloseCircle className="w-6 text-gray-600" />
                          </button>
                        </>
                      ) : (
                        <>
                          {comment.username === session?.user.name ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditComment({
                                    id: comment.id,
                                    payload: comment.payload,
                                  })
                                }
                                className="text-gray-600/50 hover:text-gray-600"
                              >
                                <AiOutlineEdit />
                              </button>
                              <button
                                type="button"
                                onClick={() => confirmDelete(comment.id)}
                                className="text-red-800/40 hover:text-red-800"
                              >
                                <HiOutlineTrash />
                              </button>
                            </>
                          ) : null}
                          {/* Reply function disabled for now.
                          <button
                            type="button"
                            onClick={() => setReplyOf(comment.id)}
                            className="text-gray-500"
                          >
                            <BsReply />
                          </button> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <div className="border border-blue-200 bg-blue-50 mt-6 p-4 rounded-md">
            <span>Sign in to write a comment</span>
            <button
              className="flex items-center justify-center my-4 font-semibold py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-6 border-gray-400/50 hover:border-gray-600/50 hover:bg-gray-300 border"
              onClick={() => {
                signIn();
              }}
            >
              Login
            </button>
            <span>Your information is only used to display your name</span>
          </div>
        )}
        {/* Comment box */}
        {session?.user && (
          <div className="flex my-8 ">
            {/* Image disabled for now.
            <div className="mr-2">
              {session?.user.image ? (
                / * eslint-disable @next/next/no-img-element * /
                <img
                  alt={session?.user.name}
                  className="rounded  border border-gray-900/50"
                  src={(session?.user.image as string) + '?v3&s=88'}
                  width="50px"
                  height="50px"
                />
              ) : (
                <div className="w-[50px] h-[50px] bg-slate-600 text-white rounded flex justify-center items-center text-2xl">
                  {(session?.user.name as string).charAt(0)}
                </div>
              )}
            </div> */}
            <form
              onSubmit={onSubmit}
              className="flex gap-8 border rounded-md border-gray-300 overflow-hidden flex-1"
            >
              <div className="w-full">
                <div className="flex border-b py-2 px-4 border-gray-400 bg-gray-100">
                  <span className="text-gray-600 text-sm font-medium flex-1 py-1">
                    Hi {session.user.name}, please leave a comment
                  </span>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="flex items-center justify-center text-sm border text-gray-600 hover:text-gray-900 dark:text-gray-100 rounded px-2 py-1 hover:bg-gray-200 hover:border-gray-400"
                  >
                    Sign out
                  </button>
                </div>
                {replyOf && (
                  <div className="flex gap-4 my-2 items-center justify-start">
                    <div className="flex flex-col items-center justify-start gap-2">
                      <BsReply className="w-4 text-gray-600 rotate-180" />
                      <p className="font-extralight italic text-gray-600 text-sm">
                        {commentList.find((comment) => comment.id === replyOf)
                          ?.payload ?? ''}
                      </p>
                    </div>
                    <button onClick={() => setReplyOf(null)} title="Cancel">
                      <AiOutlineCloseCircle className="w-4 text-gray-600" />
                    </button>
                  </div>
                )}
                <div className="flex-col m-3">
                  <textarea
                    onChange={onChange}
                    value={comment}
                    placeholder="Leave a comment"
                    className="p-2 border rounded-md border-gray-300 focus:border-gray-400 w-full outline-none min-h-[90px]"
                  />
                  <button
                    disabled={!comment}
                    className={cn(
                      comment
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-600/50 text-gray-100',
                      'px-4 py-1 mt-1  flex rounded-lg text-white float-right mb-2 border border-gray-800/20'
                    )}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
