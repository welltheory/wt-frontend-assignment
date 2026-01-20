import type { MemberFormData } from "../../components/member/memberForm/types";
import type { Member } from "../members/type";
import { apiConfig } from "./config";
import { HttpMethod } from "./types";

const API_HEADERS = {
  "content-type": "application/json",
  "x-api-key": apiConfig.apiKey,
};

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_IMAGE_FILE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export const loadMembers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return _apiFetch({
    path: `/members?page=${page}&limit=${limit}`,
    method: HttpMethod.Get,
  });
};

export const getMemberById = async ({ id }: { id: string }) => {
  return _apiFetch({ path: `/members/${id}`, method: HttpMethod.Get });
};

export const createMember = async (data: MemberFormData): Promise<Member> => {
  return _apiFetch({
    path: `/members`,
    method: HttpMethod.Post,
    body: data,
  });
};

export const uploadMemberPhotoById = async ({
  id,
  file,
}: {
  id: string;
  file: File;
}) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("That image is too large");
  }

  if (!ALLOWED_IMAGE_FILE_TYPES.has(file.type)) {
    throw new Error("That image type is not supported");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await _apiFetch({
    method: HttpMethod.Put,
    path: `/members/${id}/photo`,
    body: formData,
    isMultipart: true,
  });

  return response;
};

export const updateMemberBydId = async ({
  id,
  data,
}: {
  id: string;
  data: MemberFormData;
}) => {
  return _apiFetch({
    path: `/members/${id}`,
    method: HttpMethod.Patch,
    body: data,
  });
};

export const deleteMemberById = async ({ id }: { id: string }) => {
  return _apiFetch({ path: `/members/${id}`, method: HttpMethod.Delete });
};

const _apiFetch = async <T extends object>({
  path,
  method,
  body,
  isMultipart = false,
}: {
  path: string;
  method: HttpMethod;
  body?: T;
  isMultipart?: boolean;
}) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const headers: Record<string, string> = { ...API_HEADERS };
  if (isMultipart) {
    delete headers["content-type"];
  }

  const response = await fetch(`${apiConfig.baseUrl}${normalizedPath}`, {
    method,
    headers,
    body: _prepareRequestBody({ body, isMultipart }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
};

const _prepareRequestBody = <T extends object>({
  body,
  isMultipart,
}: {
  body?: T;
  isMultipart: boolean;
}): BodyInit | undefined => {
  if (isMultipart && body instanceof FormData) {
    return body;
  }
  return body ? JSON.stringify(body) : undefined;
};
