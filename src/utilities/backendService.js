import baseService, { baseURL } from "./baseService";

export const login = async (username, password) => {
  return await baseService.post("/login", {
    username,
    password
  });
}

export const register = async (email, name, username, password) => {
  return await baseService.post("/register", {
    email,
    name,
    username,
    password
  });
}

export const logout = async () => {
  await baseURL.get("/sanctum/csrf-cookie")
    .then(() => {
      return baseService.post("/logout", undefined, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
    })

}

export const getUser = async () => {
  return await baseService.get("/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
}

export const uploadImage = async (image) => {
  return await baseService.post("/upload", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    file_path: image,
    user_id: JSON.parse(localStorage.getItem("user")).user_id
  });
}

export const getImageHistory = async () => {
  return await baseService.get("/user-history", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}

export const getImages = async id => {
  return await baseService.get(`/user-history/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}