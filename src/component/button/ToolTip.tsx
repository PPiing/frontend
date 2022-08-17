import "./ToolTip.css"

export function ToolTip(props: any) {
  const { content } = props;
  return (
    <div className="myToolTipText">
      {content}
    </div>
  );
}
