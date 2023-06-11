// @ts-ignore
import mockFile from "./../mock/testData.txt";

const importTSV = async (path: string): Promise<JeopardyCategoryQuestion[]> => {
  const responseSet: JeopardyCategoryQuestion[] = [];
  const buildingCat: JeopardyCategoryQuestion = { category: "", questions: [] };

  if (path === "") {
    console.log("No Path Defined. Test data will be used");
    path = mockFile;
  }

  const loadingData = fetch(path)
    .then((response) => response.text())
    .then((data) => {
      const dataByEachEntry = data.split("\n");
      dataByEachEntry.forEach((questionEntry) => {
        const jpQuestion = questionEntry.split("\t");

        if (buildingCat.category === "") buildingCat.category = jpQuestion[0];

        if (buildingCat.category === jpQuestion[0]) {
          buildingCat.questions.push({
            category: jpQuestion[0],
            questions: jpQuestion[1],
            answer: jpQuestion[2],
            score: jpQuestion[3],
          });
        } else {
          responseSet.push({ ...buildingCat });
          buildingCat.category = jpQuestion[0];
          buildingCat.questions = [];
          buildingCat.questions.push({
            category: jpQuestion[0],
            questions: jpQuestion[1],
            answer: jpQuestion[2],
            score: jpQuestion[3],
          });
        }
      });
      responseSet.push({ ...buildingCat });
    })
    .catch((e) => console.log(e));

  await loadingData;
  return responseSet;
};

export default importTSV;
