interface AmountDisplayProps {
  amount: number;
  title: string;
  description: string;
  sourceUrl: string;
  category: number;
}

const categoryMap: Record<number, string> = {
  1: "Housing & Homelessness Programs",
  2: "Major Policy Proposals", 
  3: "Government Budgets & Spending",
  4: "Income & Economic Statistics",
  5: "Individual Wealth",
  6: "Corporate Valuations"
};

export function AmountDisplay({ amount, title, description, sourceUrl, category }: AmountDisplayProps) {
  const formatAmount = (value: number) => {
    let formatted: string;
    let decimal: string;
    
    if (value >= 0.05) {
      formatted = value.toFixed(2);
      const [whole, dec] = formatted.split('.');
      decimal = dec;
      const wholeWithCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return { whole: wholeWithCommas, decimal };
    } else {
      formatted = value.toFixed(6);
      const [whole, dec] = formatted.split('.');
      decimal = dec;
      // remove trailing zeros
      decimal = decimal.replace(/0+$/, '');
      const wholeWithCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return { whole: wholeWithCommas, decimal };
    }
  };

  const getCategoryColor = (categoryNum: number) => {
    const colors: Record<number, string> = {
      1: "text-emerald", // Housing & Homelessness Programs
      2: "text-emerald",       // Major Policy Proposals
      3: "text-bright-pink",    // Government Budgets & Spending
      4: "text-midnight-green", // Income & Economic Statistics
      5: "text-sunglow",        // Individual Wealth
      6: "text-blue-ncs"        // Corporate Valuations
    };
    return colors[categoryNum] || "text-gray-700";
  };

  const { whole, decimal } = formatAmount(amount);

  return (
    <div className="flex items-baseline justify-center py-1" style={{ width: '100%' }}>
      <div className={`flex items-baseline justify-end font-mono text-2xl font-bold mr-4 w-1/2 ${getCategoryColor(category)}`}>
        <span>$</span>
        <span className="text-right" style={{ minWidth: '120px' }}>{whole}</span>
        <span>.</span>
        <span className="text-left" style={{ width: '120px' }}>{decimal}</span>
      </div>
      <div className="ml-4 w-1/2">
        <a 
          href={sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-semibold text-m text-gray-800  hover:underline decoration-dotted hover:text-gray-600 transition-colors"
        >
          {title}
        </a>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}