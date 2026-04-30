import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content', 'languages');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function migrate() {
  const files = fs.readdirSync(contentDir);
  let migratedCount = 0;

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const langSlug = file.replace('.md', '');
    const oldFilePath = path.join(contentDir, file);
    const langDirPath = path.join(contentDir, langSlug);
    const newIndexPath = path.join(langDirPath, 'index.md');

    // Read the original file
    const fileContent = fs.readFileSync(oldFilePath, 'utf8');
    const parsed = matter(fileContent);

    // Skip if it doesn't have topics
    if (!parsed.data.topics || !Array.isArray(parsed.data.topics)) {
      console.log(`Skipping ${langSlug} (no topics found)`);
      continue;
    }

    // Create the directory for the language
    if (!fs.existsSync(langDirPath)) {
      fs.mkdirSync(langDirPath, { recursive: true });
    }

    // Process topics: generate slugs and create placeholder files
    for (const section of parsed.data.topics) {
      if (!section.items) continue;
      
      for (const item of section.items) {
        // Generate a slug from the title, handling duplicates if necessary
        let slug = slugify(item.title);
        // Simple deduplication logic could go here, but titles are usually unique enough per section
        item.slug = slug;

        const topicFilePath = path.join(langDirPath, `${slug}.md`);
        if (!fs.existsSync(topicFilePath)) {
          // Create placeholder file
          const placeholderFrontmatter = {
            title: item.title,
            description: item.description || `Learn about ${item.title} in ${parsed.data.name}`,
          };
          const placeholderContent = `---\n${Object.entries(placeholderFrontmatter)
            .map(([k, v]) => `${k}: "${String(v).replace(/"/g, '\\"')}"`)
            .join('\n')}\n---\n\n## ${item.title}\n\nContent for ${item.title} goes here.\n`;
          
          fs.writeFileSync(topicFilePath, placeholderContent);
        }
      }
    }

    // Write the updated index.md
    const updatedIndexContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(newIndexPath, updatedIndexContent);

    // Delete the old file
    fs.unlinkSync(oldFilePath);
    migratedCount++;
    console.log(`Migrated ${langSlug}: created ${langDirPath} with index.md and topic files.`);
  }

  console.log(`Migration complete. Migrated ${migratedCount} languages.`);
}

migrate().catch(console.error);
