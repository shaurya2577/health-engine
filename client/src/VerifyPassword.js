async function VerifyPassword() {
  const password = localStorage.getItem("password");
  try {
    const response = await fetch("http://localhost:3002/verifylogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    if (data.status == true) {
      console.log("true");
      return true;
    } else {
      console.log("fals");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export default VerifyPassword;
