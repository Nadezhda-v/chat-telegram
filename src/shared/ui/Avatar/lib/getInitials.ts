export const getInitials = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return '#';

  const digits = trimmed.replace(/\D/g, '');
  if (digits.length >= 2 && /^[+\d\s()-]+$/.test(trimmed))
    return digits.slice(-2);

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();

  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
}
