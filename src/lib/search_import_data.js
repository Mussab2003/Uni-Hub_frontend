import { algoliasearch } from "algoliasearch";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY
  
);

export const addRepoToAlgolia = async (repo) => {
  try {
    const object = {
      objectID: repo.id,
      name: repo.name,
      description: repo.description,
      createdAt: repo.created_at,
      tags: repo.tags || [],
      likes: Number(repo.likes),
      numOfComments: Number(repo.num_of_comments),
      visibility: repo.visibility,
    };
    const result = await searchClient.saveObject({
      indexName: "repo_index",
      body: object,
    });
  } catch (error) {
    console.error("Error syncing repo to Algolia:", error);
  }
};

export const addReposToAlgolia = async (repos) => {
  try {
    const objects = repos.map((repo) => ({
      objectID: repo.id,
      name: repo.name,
      description: repo.description,
      createdAt: repo.created_at,
      tags: repo.tags || [],
      likes: Number(repo.likes),
      numOfComments: Number(repo.num_of_comments),
    }));
    const result = await searchClient.saveObjects({
        indexName: 'repo_index',
        objects: objects
    })
  } catch (err) {
    
  }
};

export const deleteRepoFromAlgolia = async (repoId) => {
  try {
    const result = await searchClient.deleteObject({
      indexName: "repo_index",
      objectID: repoId,
    });
  } catch (error) {
    console.error("Error deleting repo from Algolia:", error);
  }
};
