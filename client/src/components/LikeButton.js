import { useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { LIKE_POST_MUTATION } from "../utils/graphql";

const LikeButton = ({ post: { id, likeCount, likes }, user }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likedButton = liked ? (
    <Button color="teal">
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likedButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
