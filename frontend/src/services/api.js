const BASE_URL = "/api";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const config = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    let data = null;

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      const errorMessage =
        (data && data.message) ||
        (data && data.error) ||
        `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!err.status && err.name === "TypeError") {
      const networkError = new Error(
        "Network error: Unable to reach the server. Please verify backend is running."
      );
      networkError.status = 0;
      throw networkError;
    }
    throw err;
  }
}

export const authApi = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: credentials,
    }),

  register: (guestData) =>
    request("/auth/register", {
      method: "POST",
      body: guestData,
    }),

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),

  getMe: () =>
    request("/auth/me", {
      method: "GET",
    }),
};

export const staffApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.department) query.set("department", params.department);
    if (params.status) query.set("status", params.status);
    if (params.search) query.set("search", params.search);
    const qs = query.toString();
    return request(`/staff${qs ? `?${qs}` : ""}`, { method: "GET" });
  },

  getById: (id) => request(`/staff/${id}`, { method: "GET" }),

  create: (staffData) =>
    request("/staff", {
      method: "POST",
      body: staffData,
    }),

  update: (id, updates) =>
    request(`/staff/${id}`, {
      method: "PUT",
      body: updates,
    }),

  delete: (id) =>
    request(`/staff/${id}`, {
      method: "DELETE",
    }),
};

export const guestApi = {
  getAll: () => request("/guest-profiles", { method: "GET" }),

  getById: (id) => request(`/guest-profiles/${id}`, { method: "GET" }),

  create: (data) =>
    request("/guest-profiles", {
      method: "POST",
      body: data,
    }),

  update: (id, updates) =>
    request(`/guest-profiles/${id}`, {
      method: "PUT",
      body: updates,
    }),

  delete: (id) =>
    request(`/guest-profiles/${id}`, {
      method: "DELETE",
    }),
};

export const userApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.role) query.set("role", params.role);
    if (params.status) query.set("status", params.status);
    if (params.search) query.set("search", params.search);
    const qs = query.toString();
    return request(`/users${qs ? `?${qs}` : ""}`, { method: "GET" });
  },

  getById: (id) => request(`/users/${id}`, { method: "GET" }),

  create: (userData) =>
    request("/users", {
      method: "POST",
      body: userData,
    }),

  update: (id, updates) =>
    request(`/users/${id}`, {
      method: "PUT",
      body: updates,
    }),

  updateStatus: (id, status) =>
    request(`/users/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),

  delete: (id) =>
    request(`/users/${id}`, {
      method: "DELETE",
    }),
};

export const roleApi = {
  getAll: () => request("/roles", { method: "GET" }),

  getById: (id) => request(`/roles/${id}`, { method: "GET" }),

  create: (roleData) =>
    request("/roles", {
      method: "POST",
      body: roleData,
    }),

  update: (id, updates) =>
    request(`/roles/${id}`, {
      method: "PUT",
      body: updates,
    }),

  delete: (id) =>
    request(`/roles/${id}`, {
      method: "DELETE",
    }),
};
