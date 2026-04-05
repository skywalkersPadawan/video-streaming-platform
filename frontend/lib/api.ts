const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const addToMyList = async (movieId: number) => {
  const userId = localStorage.getItem("session");
  const res = await fetch("http://localhost:3001/my-list/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      movieId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add");
  }

  return res.json();
};

export const removeFromMyList = async (movieId: number) => {
  const userId = localStorage.getItem("session");
  const res = await fetch(`${BASE_URL}/my-list/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      movieId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to remove");
  }

  return res.json();
};

export const getMyList = async () => {
  const userId = localStorage.getItem("session");

  if (!userId) {
    throw new Error("User not logged in");
  }

  const res = await fetch(`${BASE_URL}/my-list/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch list");
  }

  return res.json();
};

export const saveProgress = async (movieId: number, progress: number) => {
  const userId = localStorage.getItem("session");

  await fetch(`${BASE_URL}/watch-history/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, movieId, progress }),
  });
};

export const getProgress = async (movieId: number) => {
  const userId = localStorage.getItem("session");

  const res = await fetch(`${BASE_URL}/watch-history/${userId}/${movieId}`);

  return res.json();
};

/* test for .gitignore */
