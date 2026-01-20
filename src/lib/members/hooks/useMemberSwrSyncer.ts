import { useCallback } from "react";
import { useSWRConfig } from "swr";
import type { Member } from "../type";

type MembersListResponse = {
  data: Member[];
  totalItems: number;
};

const updateMemberInList = (
  current: MembersListResponse | undefined,
  updatedMember: Member,
): MembersListResponse | undefined => {
  if (!current) return current;
  return {
    ...current,
    data: current.data.map((m) =>
      m.id === updatedMember.id ? updatedMember : m,
    ),
  };
};

/**
 * Hook for syncing member updates across SWR caches.
 * Updates both the individual member cache (/members/:id) and
 * the paginated members list cache (/members).
 */
export const useMemberSwrSyncer = () => {
  const { mutate: globalMutate } = useSWRConfig();

  /**
   * Syncs a member update to both the individual member cache
   * and all paginated members list caches.
   *
   */
  const syncMember = useCallback(
    (member: Member) => {
      // Update individual member cache
      globalMutate(["member", member.id], member, { revalidate: false });

      // Update all paginated members list caches
      // NOTE(lincoln) this is helpful, but it introduces complexity around reconciling future server responses that may or may not be stale due to the replica lag issue. I have not taken the time to address this here.
      globalMutate(
        (key) => Array.isArray(key) && key[0] === "members",
        (current: MembersListResponse | undefined) =>
          updateMemberInList(current, member),
        { revalidate: false },
      );
    },
    [globalMutate],
  );

  // NOTE(lincoln) We could also add an addMember() method so that a newly created member is immediately made available in the list of members, but this would introduce more complexity around pagination and reconciling the local list state with future server responses (e.g. if the server returns a stale list for a page that the client is currently viewing and that causes the new member to not be displayed). It's solvable, but I didn't want to dive into that here.
  return { syncMember };
};
