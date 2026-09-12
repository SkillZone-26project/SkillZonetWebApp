const HelpHeader = ({ article }) => {
  return (
    <header className="mb-1 pr-40">
      <h1 className="text-[32px] font-semibold tracking-[-0.5px]">
        {article.title}
      </h1>

      <p className="text-[14px] leading-6 text-gray-500 max-w-[500px]">
        {article.description}
      </p>
    </header>
  );
};

export default HelpHeader;
