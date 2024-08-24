"use server";

import { professors } from "@/lib/db/schema/professors";
import { createProfessor } from "@/server/actions/professors.actions";

type NewProfessor = typeof professors.$inferInsert;

const professorsList: NewProfessor[] = [
  {
    name: "Professor Moriarty",
    subjects: ["English", "Mathematics"],
    college: "University of California, Berkeley",
    department: "Department of Computer Science",
    rating: 45,
    totalReviews: 1,
    tags: [],
  },
  {
    name: "Dr. Zara Khan",
    subjects: ["Physics", "Chemistry"],
    college: "University of Karachi",
    department: "Department of Science",
    rating: 42,
    totalReviews: 10,
    tags: ["Best Teacher"],
  },
  {
    name: "Professor John Doe",
    subjects: ["Computer Science", "IT"],
    college: "MIT University",
    department: "Department of Computer Science",
    rating: 48,
    totalReviews: 20,
    tags: ["Excellent", "Recommended"],
  },
  {
    name: "Dr. Amna Iqbal",
    subjects: ["Biology", "Zoology"],
    college: "University of Punjab",
    department: "Department of Life Sciences",
    rating: 40,
    totalReviews: 5,
    tags: ["Caring Teacher"],
  },
  {
    name: "Professor Muhammad Ali",
    subjects: ["History", "Civics"],
    college: "University of Sindh",
    department: "Department of Social Sciences",
    rating: 41,
    totalReviews: 15,
    tags: ["Knowledgeable"],
  },
  {
    name: "Dr. Fatima Jinnah",
    subjects: ["Economics", "Political Science"],
    college: "University of Peshawar",
    department: "Department of Social Sciences",
    rating: 46,
    totalReviews: 12,
    tags: ["Inspiring"],
  },
  {
    name: "Professor Abdul Qadeer",
    subjects: ["Mathematics", "Statistics"],
    college: "University of Balochistan",
    department: "Department of Mathematics",
    rating: 44,
    totalReviews: 8,
    tags: ["Patient Teacher"],
  },
  {
    name: "Dr. Saima Iqbal",
    subjects: ["Sociology", "Psychology"],
    college: "University of AJK",
    department: "Department of Social Sciences",
    rating: 43,
    totalReviews: 18,
    tags: ["Supportive"],
  },
  {
    name: "Professor Imran Khan",
    subjects: ["Business Studies", "Management"],
    college: "University of Lahore",
    department: "Department of Business Administration",
    rating: 47,
    totalReviews: 25,
    tags: ["Motivational"],
  },
  {
    name: "Dr. Hira Khan",
    subjects: ["Environmental Science", "Botany"],
    college: "University of Gilgit-Baltistan",
    department: "Department of Life Sciences",
    rating: 41,
    totalReviews: 6,
    tags: ["Dedicated"],
  },
  {
    name: "Professor Naveed Iqbal",
    subjects: ["Philosophy", "Urdu Literature"],
    college: "University of Islamabad",
    department: "Department of Humanities",
    rating: 42,
    totalReviews: 11,
    tags: ["Thought-Provoking"],
  },
  {
    name: "Dr. Asma Javed",
    subjects: ["Biochemistry", "Microbiology"],
    college: "University of Faisalabad",
    department: "Department of Life Sciences",
    rating: 45,
    totalReviews: 14,
    tags: ["Expert"],
  },
  {
    name: "Professor Kashif Iqbal",
    subjects: ["Civil Engineering", "Architecture"],
    college: "University of Engineering and Technology",
    department: "Department of Engineering",
    rating: 46,
    totalReviews: 22,
    tags: ["Practical"],
  },
  {
    name: "Dr. Ayesha Khan",
    subjects: ["Pharmacology", "Toxicology"],
    college: "University of Health Sciences",
    department: "Department of Pharmacy",
    rating: 44,
    totalReviews: 9,
    tags: ["Knowledgeable"],
  },
  {
    name: "Professor Arslan Iqbal",
    subjects: ["Aerospace Engineering", "Mechanical Engineering"],
    college: "University of Aerospace and Engineering",
    department: "Department of Engineering",
    rating: 48,
    totalReviews: 24,
    tags: ["Innovative"],
  },
];

export async function seed() {
  for (const professor of professorsList) {
    await createProfessor(professor);
  }
}
