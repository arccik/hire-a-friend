import MessageBubble from "./MessageBubble";

export default function ChatBoddy() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mb-4 flex items-center">
        <div className="mr-4 flex flex-none flex-col items-center space-y-1">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <a href="#" className="block text-xs hover:underline">
            John Doe
          </a>
        </div>
        <div className="relative mb-2 flex-1 rounded-lg bg-indigo-400 p-2 text-white">
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>

          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-indigo-400"></div>
        </div>
      </div>

      <div className="mb-4 flex flex-row-reverse items-center">
        <div className="ml-4 flex flex-none flex-col items-center space-y-1">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <a href="#" className="block text-xs hover:underline">
            Mango
          </a>
        </div>
        <div className="relative mb-2 flex-1 rounded-lg bg-indigo-100 p-2 text-gray-800">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </div>

          <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 rotate-45 transform bg-indigo-100"></div>
        </div>
      </div>

      <div className="mb-4 flex flex-row-reverse items-center">
        <div className="mr-4 flex flex-none flex-col items-center space-y-1">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <a href="#" className="block text-xs hover:underline">
            John Doe
          </a>
        </div>
        <div className="relative mb-2 flex-1 rounded-lg bg-indigo-400 p-2 text-white">
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>

          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-indigo-400"></div>
        </div>
      </div>

      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
    </div>
  );
}
