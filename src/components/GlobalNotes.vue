<template>
  <div
    class="w-100 overflow-hidden mb-12 rounded-xl  bg-container border-container_border"
    style="backdrop-filter: blur(40px); transition: all 0.5s; box-shadow: 0 12px 40px rgba(0,0,0,0.25);"
  >

    <!-- Header -->
    <div
      class="d-flex align-center justify-space-between px-8 py-6 border-lg border-secondary_container_border"
    >
      <div class="d-flex align-center ga-3">
        <div
          class="rounded-xl d-flex align-center justify-center"
          style="width:40px; height:40px; background: rgba(37,99,235,0.2);"
        >
          <MessageSquare :size="20" class="text-blue" />
        </div>
        <div>
          <h3
            class="text-sm font-weight-black text-uppercase text-fields_text"
            style="letter-spacing: 0.1em;"
          >
            Account Interaction Notes
          
          <p
            class="font-weight-bold text-uppercase text-grey-lighten-1"
            style="font-size: 15px; letter-spacing: 0.1em;"
          >
            Chronological log of collector activity
          </p>
          </h3>
        </div>
      </div>

      <span
        class="px-4 py-1 rounded-pill font-weight-black text-uppercase bg-container_border text-blue-darken-3"
        style="font-size: 10px; letter-spacing: 0.1em;"
      >
        {{ mockNotes.length }} Entries
      </span>
    </div>

    <!-- Body -->
    <div class="d-flex flex-column flex-lg-row" style="min-height: 600px;">

      <!-- Notes List -->
      <div class="pa-8" style="flex: 1; min-width: 0; max-width: 1800px;">
        <div class="d-flex flex-column ga-4">
          <div
            v-for="note in mockNotes"
            :key="note.id"
            class="px-6 py-3 note-card rounded-xl border-sm bg-secondary_container_bg border-secondary_container_border"
            style="transition: transform 0.2s, background 0.2s, box-shadow 0.2s;"
          >
            <div class="d-flex justify-space-between align-center mb-3">
              <div class="d-flex align-center ga-2">
                <div
                  class="rounded-circle d-flex align-center justify-center bg-blue-darken-1 text-white font-weight-black"
                  style="width:24px; height:24px; font-size:8px;"
                >
                  {{ note.author.substring(0, 2).toUpperCase() }}
                </div>
                <span
                  class="font-weight-black text-uppercase text-blue-darken-1"
                  style="font-size: 10px; letter-spacing: 0.1em;"
                >
                  {{ note.author }}
                </span>
              </div>
              <span
                class="font-weight-bold text-grey-lighten-1"
                style="font-size: 10px;"
              >
                {{ note.time }}
              </span>
            </div>
            <p
              class="text-sm text-fields_text"
              style="line-height: 1.6;"
            >
              {{ note.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div
        class="pa-8 d-flex flex-column ga-4 bg-secondary_container_bg"
        :class="$vuetify?.display?.lgAndUp ? 'input-area-lg' : 'input-area-sm'"
      >
        <div class="d-flex flex-column ga-2" style="flex: 1;">
          <div class="d-flex justify-space-between align-center">
            <label
              class="font-weight-black text-uppercase text-fields_text"
              style="font-size: 17px; letter-spacing: 0.1em;"
            >
              New Activity Entry
            </label>
            <div class="d-flex align-center ga-2 text-sm text-fields_text">
              Important <Star :size="16" />
            </div>
          </div>

          <textarea
            v-model="newNote"
            placeholder="Record call outcome or system update..."
            class="note-input w-100 bg-fields_bg text-fields_text border-lg border-secondary_container_border"
            style="flex: 1; min-height: 280px; border-radius: 24px; padding: 24px; font-size: 0.875rem; resize: none; outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%;"
          />
        </div>

        <button
          :disabled="!newNote"
          class="post-btn"
        >
          <Send :size="12" class="mr-1" />
          Post Entry
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MessageSquare, Send, Star } from 'lucide-vue-next'



const newNote = ref('')

const mockNotes = [
  { id: 1, time: '2h ago',      author: 'Sarah J.', text: 'Called debtor, promised to pay $500 by Friday.'       },
  { id: 2, time: '1d ago',      author: 'System',   text: 'Auto-reminder sent via SMS.'                          },
  { id: 3, time: '3d ago',      author: 'Sarah J.', text: 'Hard refusal during initial contact. Escalating.'     },
  { id: 4, time: '4d ago',      author: 'System',   text: 'Account transferred to legal review queue.'           },
  { id: 5, time: '1 week ago',  author: 'Admin',    text: 'Initial claim documentation verified.'                },
]
</script>

<style scoped>
.note-card:hover {
  transform: scale(1.01);
}

.input-area-lg {
  width: 800px;
  border-left: 2px solid rgb(var(--v-theme-secondary_container_border)) !important;
}

.input-area-sm {
  border-top: 2px solid rgb(var(--v-theme-secondary_container_border)) !important;
}

.note-input:focus {
  border-color: rgb(var(--v-theme-secondary_container_border)) !important;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.post-btn {
  width: 100%;
  height: 40px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 8px 24px rgba(37,99,235,0.3);
  transition: background-color 0.2s;
}

.post-btn:hover {
  background-color: #1976d2;
}

.post-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #9E9E9E;
}
</style>
