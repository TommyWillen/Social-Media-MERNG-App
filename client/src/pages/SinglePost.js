import { useContext, useState, useRef } from "react";
import { CREATE_COMMENT_MUTATION, FETCH_POST_QUERY } from "../utils/graphql";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const commentInputRef = useRef(null)

  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur()
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  let postMarkup;

  if (loading) {
    return <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment button")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
              <Card.Description>Post a comment</Card.Description>
              <Form>
                <div className="ui action input fluid">
                  <input
                    type="text"
                    placeholder="Comment..."
                    name="comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    ref={commentInputRef}
                  />
                  <button type="submit" className="ui button teal" disabled={comment.trim() === ""} onClick={submitComment}>
                    Submit
                  </button>
                </div>
              </Form>
              </Card.Content>
            </Card>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default SinglePost;
