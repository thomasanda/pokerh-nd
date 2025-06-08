import { Zap } from "lucide-react";

const PokerHeader = () => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
        <Zap className="h-8 w-8 text-yellow-400" />
        Pokerhånd Generator
      </h1>
    </div>
  );
};

export default PokerHeader;
