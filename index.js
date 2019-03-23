class Question {
  constructor(questionMaxMark, studentMaxMark){
      this.questionMaxMark = questionMaxMark;
      this.studentMaxMark = studentMaxMark
  }
  getQuestionMaxMarks(){
      return this.questionMaxMark;
  }
  getStudentMaxMark(){
      return this.studentMaxMark;
  }
}

class Group {
  constructor(questions, maxNumberOfQuestions, groupMarks){
      this.questions = questions;
      this.maxNumberOfQuestions = maxNumberOfQuestions;
      this.groupMarks = groupMarks;
  }
  getQuestions(){
      return this.questions;
  }
  getMaxNumberOfQuestions(){
      return this.maxNumberOfQuestions;
  }
  getGroupMarks(){
      return this.groupMarks;
  }
  setGroupMarks(groupMarks){
      this.groupMarks = groupMarks;
  }
}

class Section {
  constructor(groups, maxNumberOfGroups, sectionMarks){
      this.groups = groups;
      this.maxNumberOfGroups = maxNumberOfGroups;
      this.sectionMarks = sectionMarks;
  }
  getGroups(){
      return this.groups;
  }
  getMaxNumberOfGroups(){
      return this.maxNumberOfGroups;
  }
  getSectionMarks(){
      return this.sectionMarks;
  }
  setSectionMarks(sectionMarks){
      this.sectionMarks = sectionMarks;
  }
}

class QuestionPaper{
  constructor(sections){
      this.sections = sections;
  }

  getSections(){
      return this.sections;
  }
}


let buildQuestionPaper = ()=>{
  let q1 = new Question(5,3);
  let q2 = new Question(5,5);
  let q3 = new Question(4,2);
  let q4 = new Question(6,4);
  let q5 = new Question(7,2);
  let q6 = new Question(3,3);
  let q7 = new Question(10,10);
  let q8 = new Question(10,10);
  let q9 = new Question(10,10);
  let q10 = new Question(10,10);
  let q11 = new Question(10, 10);
  let q12 = new Question(10, 10);
  let q13 = new Question(10, 10);
  let q14 = new Question(10, 10);

  let g1 = new Group([q1,q2],2,0);
  let g2 = new Group([q3,q4],2,0);
  let g3 = new Group([q5,q6],2,0);
  let g4 = new Group([q7,q8,q9],3,0);
  let g5 = new Group([q10,q11,q12,q13,q14],3,0);

  let s1 = new Section([g1,g2,g3],2,0);
  let s2 = new Section([g4,g5],2,0);

  let questionPaper  = new QuestionPaper([s1,s2]);

  return questionPaper;
}

function getMarkTotalMarks(){
  let questionPaper = buildQuestionPaper();
  let maxMarks=0;
  questionPaper.getSections().forEach(eachSection =>{
      eachSection.getGroups().forEach(eachGroup=>{
          let studentMaxMarksInGroup = eachGroup.getQuestions().map(eachQuestion=>{
              return eachQuestion.getStudentMaxMark();
          });
          studentMaxMarksInGroup.sort((a,b)=>{
              return b -a;
          });
          let maxMarksInGroup = 0;
          for(let i=0;i<studentMaxMarksInGroup.length;i++){
              if(i>=eachGroup.getMaxNumberOfQuestions()){
                  break;
              }
              maxMarksInGroup+=studentMaxMarksInGroup[i];
          };
          eachGroup.setGroupMarks(maxMarksInGroup);
      });
      let groupsMarks  = eachSection.getGroups().map(group=>{
          return group.getGroupMarks()
      }).sort((a,b)=>{
          return b - a;
      });
      let maxMarksInSection = 0;
      for(let i=0;i<groupsMarks.length;i++){
          if(i>=eachSection.getMaxNumberOfGroups()){
              break;
          }
          maxMarksInSection+=groupsMarks[i];
      };
      eachSection.setSectionMarks(maxMarksInSection);
      maxMarks += maxMarksInSection;
  });
  return maxMarks;
}
console.log(getMarkTotalMarks());