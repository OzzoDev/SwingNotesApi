import { executeQuery } from "../utils/utils.js";

export const seedNotes = async () => {
  await executeQuery(`
    INSERT INTO note (user_id, title, text)
    VALUES
      (1, 'Buy groceries', 'Milk, eggs, bread, and bananas'),
      (1, 'Workout plan', 'Push-pull-legs split, 5 days a week'),
      (1, 'Books to read', 'Atomic Habits, Deep Work, Clean Code'),
      (2, 'Vacation spots', 'Japan, Iceland, and New Zealand'),
      (2, 'Learn TypeScript', 'Finish official docs and create a mini project'),
      (3, 'Meeting notes', 'Discussed Q2 goals and marketing strategy'),
      (3, 'Dinner ideas', 'Try making Thai curry or lasagna'),
      (3, 'Budget', 'Track expenses and reduce dining out'),
      (4, 'Interview prep', 'Review data structures and algorithms'),
      (5, 'Gift list', 'Birthday gift ideas for Mom and Dad'),
      (5, 'Side project', 'Build a habit tracker web app'),
      (6, 'Car maintenance', 'Oil change and tire rotation'),
      (6, 'Podcast topics', 'Mindfulness, productivity, tech trends'),
      (6, 'Weekly review', 'Summarize tasks and set goals'),
      (7, 'Recipe list', 'Chili, pancakes, grilled cheese'),
      (8, 'Workout log', 'Logged 3 gym sessions this week'),
      (9, 'Startup ideas', 'Note sharing app for teams'),
      (9, 'Language goals', 'Practice Spanish daily'),
      (10, 'Pet care', 'Vet appointment on Friday'),
      (10, 'Cleaning checklist', 'Kitchen, bathroom, floors')
  `);

  console.log("✅ Seeded 20 notes");
};
