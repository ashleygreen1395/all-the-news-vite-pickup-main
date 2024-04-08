import Story from "./Story";

const Stories = ({ stories }) => {
  return (
    <div class="site-wrap">
      {stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </div>
  );
};

export default Stories;
