export default function PrettyDate(dateStr) {
  return new Date(dateStr).toLocaleString("IN");
}
