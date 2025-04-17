"use server";
import { Client } from "yay.js";

interface attachment {
  uri?: string;
  thumbnail?: string;
}

interface video {
  uri?: string;
  thumbnail?: string;
}

interface postContent {
  text?: string;
  attachment?: attachment[];
  video?: video[];
}

interface postItems {
  id: number;
  postContent: postContent;
  createdAt?: string | null;
}

export async function getPost(client: Client) {
  //#TODO DBから取得
  // const email: string = process.env.EMAIL ?? "";
  // const password: string = process.env.PASSWORD ?? "";

  // const client = new Client({ saveCookie: false });

  // await client.login({
  //   email,
  //   password,
  // });

  //#######
  const postCount: number = (await client.getMyPosts({ number: 1 })).posts[0].user?.postsCount ?? 0;
  // const postCount: number = 1;
  // console.log((await client.getPost({ postId: 383481368 })).post);

  const number: number | undefined = 20;
  const myPostsTexts: postItems[] = [];
  let fromPostId: number | undefined; //取得する際に基準となる投稿ID
  for (let i = 0; i < Math.ceil(postCount / number); i++) {
    const myPosts = await client.getMyPosts({
      includeGroupPost: true,
      number,
      fromPostId,
    });
    const myPostsTextsData = myPosts.posts.map((post) => {
      fromPostId = post.id;
      if (
        !post.groupId &&
        !("inReplyTo" in post) &&
        (post.postType === "text" || post.postType === "image" || post.postType === "video")
      ) {
        const postItems: postItems = {
          id: post.id ?? 0,
          postContent: {
            text: post.text,
            attachment: [],
            video: [],
          },
          createdAt: post.createdAt ? new Date(post.createdAt * 1000).toLocaleString() : null,
        };

        if ("attachment" in post) {
          const postProperty = Object.keys(post);

          switch (true) {
            case postProperty.includes("attachment"):
              postItems.postContent.attachment?.push({
                uri: post.attachment,
                thumbnail: post.attachmentThumbnail,
              });
              break;
            case postProperty.includes("attachment_2"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_2,
                thumbnail: post.attachment_2Thumbnail,
              });
              break;
            case postProperty.includes("attachment_3"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_3,
                thumbnail: post.attachment_3Thumbnail,
              });
              break;
            case postProperty.includes("attachment_4"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_4,
                thumbnail: post.attachment_4Thumbnail,
              });
              break;
            case postProperty.includes("attachment_5"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_5,
                thumbnail: post.attachment_5Thumbnail,
              });
              break;
            case postProperty.includes("attachment_6"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_6,
                thumbnail: post.attachment_6Thumbnail,
              });
              break;
            case postProperty.includes("attachment_7"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_7,
                thumbnail: post.attachment_7Thumbnail,
              });
              break;
            case postProperty.includes("attachment_8"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_8,
                thumbnail: post.attachment_8Thumbnail,
              });
              break;
            case postProperty.includes("attachment_9"):
              postItems.postContent.attachment?.push({
                uri: post.attachment_9,
                thumbnail: post.attachment_9Thumbnail,
              });
              break;

            default:
              break;
          }
        }

        if (post.videos?.length) {
          const videos = post.videos.map((video) => ({
            uri: video.videoUrl,
            thumbnail: video.thumbnailUrl,
          }));
          postItems.postContent.video = videos;
        }

        return postItems;
      } else {
        return "";
      }
    });
    const textsDatas = myPostsTextsData.filter((post) => post !== "");
    myPostsTexts.push(...textsDatas); //
  }
  // //###############
  // console.log(myPostsTexts); //debug
  return myPostsTexts;
}
