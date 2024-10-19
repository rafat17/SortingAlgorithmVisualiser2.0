const getLabelsForLegend = (selectedAlgorithm: string) => {
  const labels = [
    { className: "bg-purple-600", label: "Selected" },
    { className: "bg-emerald-600", label: "Sorted" },
  ];

  if (selectedAlgorithm === "Quick Sort") {
    labels.push({ className: "bg-fuchsia-700", label: "Pivoted" });
  }

  return labels;
};

export default getLabelsForLegend;
