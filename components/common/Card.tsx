import React from 'react';

export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="border rounded-lg shadow p-4">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;