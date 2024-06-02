# Quiz App | Front End

```
//components/signup.jsx

const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Assuming you want the minimum password length to be 8
    const minPasswordLength = 8;

    if (
      formData.password !== formData.confirmPassword ||
      formData.password.length < minPasswordLength
    ) {
      alert(
        `Passwords do not match or are too short (minimum ${minPasswordLength} characters)`
      );
      return;
    }

    // register api
    await signupUser(formData);

    if (signupUser) {
      // navigate("/dashboard");
      alert("Sign Up Successful");
    }
  };


```
