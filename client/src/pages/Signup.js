import { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { SIGNUP_USER } from "../utils/graphql";

const Signup = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});
  
  const signupUser = () => {
    addUser()
}
  const {onChange, onSubmit, values} = useForm(signupUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  } )

  const [addUser, { loading }] = useMutation(SIGNUP_USER, {
    update(_, {data: {register: userData}}) {
        context.login(userData)
      props.history.push("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  

  return (
    <div className="form-container">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Sign Up!</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
          type="password"
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Sign Up!
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



export default Signup;
