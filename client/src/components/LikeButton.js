import { useEffect, useState } from "react"
import { Button, Icon, Label } from "semantic-ui-react"
import {gql, useMutation} from "@apollo/client"

const LikeButton = ({post: {id, likeCount, likes}, user}) => {
    const [liked, setLiked] = useState(false)
    
    useEffect(() => {
        if(likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    })

    const likedButton = liked ? (
            <Button color="teal" >
            <Icon name="heart" />
          </Button>
        ) : (
            <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        )

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likedButton}
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId) {
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton
