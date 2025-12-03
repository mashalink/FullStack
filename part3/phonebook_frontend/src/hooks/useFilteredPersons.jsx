import { useMemo } from "react";

export const useFilteredPersons = (persons, filter) => {
  return useMemo(() => {
    const q = filter.trim().toLowerCase();
    const list = q
      ? persons.filter((p) => p.name.toLowerCase().includes(q))
      : persons.slice(); // copy because sort mutates
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [filter, persons]);
};
