import type { Member, PaginatedResponse } from "../types/member";
import { api } from "./client";

type ApiSuccess<T> = { ok: true; data: T };
type ApiError = {
  ok: false;
  error: string;
  details?: any;
};

function errorOut(err: any): ApiError {
  const apiError = err?.response?.data;

  return {
    ok: false,
    error:
      apiError?.error || apiError?.message || err?.message || "Request failed",
    details: apiError?.details,
  };
}

//
// 1. List Members (Paginated)
// GET /members?page=1&limit=10
//
export async function listMembers(
  page: number,
  limit: number
): Promise<ApiSuccess<PaginatedResponse<Member>> | ApiError> {
  try {
    const res = await api.get<PaginatedResponse<Member>>("/members", {
      params: { page, limit },
    });
    return { ok: true, data: res.data };
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 400) {
      return {
        ok: false,
        error: "Invalid page or limit values.",
        details: err?.response?.data?.details,
      };
    }

    if (status === 401) {
      return {
        ok: false,
        error: "Unauthorized. Missing or invalid API key.",
        details: err?.response?.data?.details,
      };
    }

    return errorOut(err);
  }
}

//
// 2. Get Single Member
// GET /members/:id
//
export async function getMember(
  id: string
): Promise<ApiSuccess<Member> | ApiError> {
  try {
    const res = await api.get<Member>(`/members/${id}`);
    return { ok: true, data: res.data };
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 404) {
      return {
        ok: false,
        error: "Member not found.",
        details: err?.response?.data?.details,
      };
    }

    return errorOut(err);
  }
}

//
// 3. Create Member
// POST /members
//
export async function createMember(payload: {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: "male" | "female" | "other";
  status: "ACTIVE" | "PAUSED";
}): Promise<ApiSuccess<Member> | ApiError> {
  try {
    const res = await api.post<Member>("/members", payload);
    return { ok: true, data: res.data };
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 400) {
      return {
        ok: false,
        error: "Validation failed. Please check required fields.",
        details: err?.response?.data?.details,
      };
    }

    if (status === 401) {
      return {
        ok: false,
        error: "Unauthorized. Missing or invalid API key.",
        details: err?.response?.data?.details,
      };
    }

    return errorOut(err);
  }
}

//
// 4. Update Member
// PATCH /members/:id
// All fields optional, at least one required
//
export async function updateMember(
  id: string,
  payload: Partial<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: "male" | "female" | "other";
    status: "ACTIVE" | "PAUSED";
  }>
): Promise<ApiSuccess<Member> | ApiError> {
  try {
    const res = await api.patch<Member>(`/members/${id}`, payload);
    return { ok: true, data: res.data };
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 400) {
      return {
        ok: false,
        error: "Invalid update. Payload may be empty or incorrect.",
        details: err?.response?.data?.details,
      };
    }

    if (status === 404) {
      return {
        ok: false,
        error: "Member not found.",
        details: err?.response?.data?.details,
      };
    }

    return errorOut(err);
  }
}

//
// 5. Delete Member
// DELETE /members/:id
//
export async function deleteMember(
  id: string
): Promise<ApiSuccess<{ success: boolean }> | ApiError> {
  try {
    const res = await api.delete<{ success: boolean }>(`/members/${id}`);
    return { ok: true, data: res.data };
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 404) {
      return {
        ok: false,
        error: "Member not found.",
        details: err?.response?.data?.details,
      };
    }

    return errorOut(err);
  }
}

//
// 6. Upload Member Photo
// PUT /members/:id/photo
// multipart/form-data with field "file"
//
export async function uploadMemberPhoto(
  id: string,
  file: File | Blob
): Promise<ApiSuccess<{ photoUrl: string }> | ApiError> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.put<{ photoUrl: string }>(
      `/members/${id}/photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { ok: true, data: res.data };
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 400) {
      return {
        ok: false,
        error: "Invalid or missing file.",
        details: err?.response?.data?.details,
      };
    }

    if (status === 404) {
      return {
        ok: false,
        error: "Member not found.",
        details: err?.response?.data?.details,
      };
    }

    if (status === 413) {
      return {
        ok: false,
        error: "File too large. Max size is 3 MB.",
        details: err?.response?.data?.details,
      };
    }

    if (status === 415) {
      return {
        ok: false,
        error: "Unsupported file type. Allowed: JPG, PNG, WebP.",
        details: err?.response?.data?.details,
      };
    }

    // fallback to shared error logic
    return errorOut(err);
  }
}
