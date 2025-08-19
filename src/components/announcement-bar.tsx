export function AnnouncementBar() {
  const message = "FREE SHIPPING ON ALL OVER INDIA";
  return (
    <div className="bg-secondary text-secondary-foreground text-base py-3 px-0 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
      </div>
       <div className="animate-marquee inline-block">
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
      </div>
    </div>
  );
}
