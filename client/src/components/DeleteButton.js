import { useState } from "react"
import { Button, Confirm, Icon } from "semantic-ui-react"
import { useMutation } from "@apollo/client"

import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql"

const DeleteButton = ({postId, callback}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data: {
                getPosts: data.getPosts.filter(post => post.id !== postId)
            }})
            if(callback) callback()
        },
        variables: {
            postId
        }
    })
    
    return (
        <>
        <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
          <Confirm
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={deletePost} />
          </>
    )
}

export default DeleteButton
