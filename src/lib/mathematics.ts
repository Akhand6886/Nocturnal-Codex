import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MathDomain {
  title: string;
  slug: string;
  description: string;
  iconName: string;
  content: string;
  url: string;
}

const mathematicsDirectory = path.join(process.cwd(), 'src/content/mathematics');

let allMathDomainsCache: MathDomain[];

function fetchAllMathDomains(): MathDomain[] {
    if (allMathDomainsCache) {
        return allMathDomainsCache;
    }

    try {
        if (!fs.existsSync(mathematicsDirectory)) {
            return [];
        }

        const entries = fs.readdirSync(mathematicsDirectory, { withFileTypes: true });
        const allMathData = entries
            .filter(entry => entry.isDirectory())
            .map((dir) => {
                const fullPath = path.join(mathematicsDirectory, dir.name, 'index.md');
                
                if (!fs.existsSync(fullPath)) return null;
                
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const matterResult = matter(fileContents);

                const frontmatter = matterResult.data as Omit<MathDomain, 'content' | 'url'>;

                return {
                    ...frontmatter,
                    content: matterResult.content,
                    url: `/mathematics/${frontmatter.slug}`,
                } as MathDomain;
            })
            .filter(Boolean) as MathDomain[];

        allMathDomainsCache = allMathData.sort((a, b) => a.title.localeCompare(b.title));
        return allMathDomainsCache;

    } catch (error) {
        console.error("Could not read mathematics directory:", error);
        return [];
    }
}

export function getAllMathDomains(): MathDomain[] {
  return fetchAllMathDomains();
}

export function getMathDomainBySlug(slug: string): MathDomain | undefined {
  return fetchAllMathDomains().find(domain => domain.slug === slug);
}
