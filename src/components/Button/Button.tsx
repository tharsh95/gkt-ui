type Props = {
  title: string;
  dClassName?: string;
  className?: string;
  limit?: number;
  currentPage?: number;
  handleClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  title,
  dClassName,
  className,
  currentPage,
  limit,
  handleClick,
  disabled
}: Props) => {
  return (
    <div>
      <button
        className={currentPage === limit ? dClassName : className}
        onClick={handleClick}
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
