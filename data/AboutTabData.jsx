const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>HTML | CSS | Tailwind CSS</li>
        <li>Javascript</li>
        <li>{`Node.js (Express)`}</li>
        <li>React.js </li>
        <li>Next.js</li>
        <li>Git/Github</li>
        <li>{`MySQL | (MongoDB, Mongoose)`}</li>
        <li>Stripe</li>
        <li>bKash</li>
        <li>{`Linus (Ubuntu)`}</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li className="py-4 border-b border-primary-500">
          <b className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            East West University, Dhaka, Bangladesh - B.Sc.
          </b>{" "}
          (2018 - 2022)
          <br></br>
          <b>Subject:</b> B.Sc. in Computer Science and Engineering (CGPA 3.42
          out of 4)
        </li>
        <li className="py-4 border-b border-primary-500">
          <b className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            Birshrestha Munshi Abdur Rouf Public College, Dhaka, Bangladesh –
            H.S.C
          </b>{" "}
          (2015 - 2017)
          <br></br>
          <b>Subject:</b> Science (GPA 4.92 out of 5)
        </li>
        <li className="py-4">
          <b className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            Motijheel Govt. Boys’ High School, Dhaka, Bangladesh - S.S.C{" "}
          </b>{" "}
          (2013 - 2015)
          <br></br>
          <b>Subject:</b> Science (GPA 5 out of 5)
        </li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-2">
        <li className="py-4 border-b border-primary-500">
          <div
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600"
            style={{ fontSize: "25px" }}
          >
            Full Stack Developer
          </div>

          <div>
            <b>UniVision</b> (March, 2023 - Present)
          </div>
        </li>
        <li className="py-4 ">
          <div
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600"
            style={{ fontSize: "25px" }}
          >
            Full Stack Developer
          </div>
          <div>
            <b>EZ Wage Bangladesh</b> (September, 2022 - April, 2023)
          </div>
        </li>
      </ul>
    ),
  },
];

export default TAB_DATA;
