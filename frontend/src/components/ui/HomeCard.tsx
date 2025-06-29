export const HomeCard = () => {
  const features = [
    {
      title: "Knowledge Sharing",
      desc: "Access a vast library of knowledge and share your expertise with others.",
      icon: "📖",
    },
    {
      title: "Community",
      desc: "Join a community of learners and experts who help each other grow.",
      icon: "👥",
    },
    {
      title: "Smart Organization",
      desc: "Organize your thoughts and discoveries with our intelligent tools.",
      icon: "🧠",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Why choose Brainly?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx} 
            className="bg-gray-100 dark:bg-gray-100/0 p-8 rounded-xl shadow text-center dark:text-white dark:shadow-lg dark:border dark:border-gray-600/80"
          >
            <div className="flex justify-center mb-4">
              <div className="text-black text-3xl p-4 rounded-full">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
