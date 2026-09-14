import React from "react";

interface Props {
  title?: string;
  message: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, message, icon }: Props) => {
  return (
    <div className="text-center py-20 px-4 border border-dashed border-gray-300 dark:border-purple-900 rounded-xl">
      {icon && (
        <div className="flex justify-center mb-4 text-purple-400/70">{icon}</div>
      )}
      {title && (
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
          {title}
        </h3>
      )}
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
