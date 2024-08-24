import ChatForm from "./_components/ChatForm";
import ChatMessages from "./_components/ChatMessages";
import PNavbar from "./_components/PNavbar";

export default function Chat() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-tingPurple to-davy pt-24 flex flex-col lg:px-8">
      <PNavbar />
      <div className="mx-auto relative flex-1 flex flex-col h-full mb-12 w-full max-w-7xl p-4 ">
        <div className="flex-1">
          <div className="p-4 md:px-16 max-w-5xl mx-auto">
            <ChatForm>
              <ChatMessages />
            </ChatForm>
          </div>
        </div>
      </div>
    </div>
  );
}
