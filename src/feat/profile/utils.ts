export function StatusDisplayDistributor(status: string): string {
  switch (status) {
    case "USST10":
      return "online";
    case "USST20":
      return "offline";
    case "USST30":
      return "in game";
    case "USST40":
      return "sleeping";
    default:
      break;
  }
  return "status error";
}
