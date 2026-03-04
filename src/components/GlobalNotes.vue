<template>
  <div
    class="w-100 overflow-hidden mb-12"
    style="border-radius: 40px; border: 1px solid; backdrop-filter: blur(40px); transition: all 0.5s; box-shadow: 0 4px 24px rgba(0,0,0,0.1);"
    :style="isDark
      ? 'background: rgba(15,23,42,0.6); border-color: rgba(255,255,255,0.1);'
      : 'background: transparent; border-color: #cbd5e1; box-shadow: 0 4px 16px rgba(15,23,42,0.15);'"
  >

    <!-- Header -->
    <div
      class="d-flex align-center justify-space-between px-8 py-6"
      style="border-bottom: 1px solid;"
      :style="isDark ? 'border-color: rgba(255,255,255,0.05);' : 'border-color: rgba(37,99,235,0.5);'"
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
            class="text-sm font-weight-black text-uppercase"
            style="letter-spacing: 0.1em;"
            :class="isDark ? 'text-white' : 'text-grey-darken-3'"
          >
            Account Interaction Notes
          </h3>
          <p
            class="font-weight-bold text-uppercase"
            style="font-size: 10px; letter-spacing: 0.1em;"
            :style="isDark ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
          >
            Chronological log of collector activity
          </p>
        </div>
      </div>

      <span
        class="px-4 py-1 rounded-pill font-weight-black text-uppercase"
        style="font-size: 10px; letter-spacing: 0.1em;"
        :style="isDark
          ? 'background: rgba(255,255,255,0.05); color: #93c5fd;'
          : 'background: #eff6ff; color: #2563eb;'"
      >
        {{ mockNotes.length }} Entries
      </span>
    </div>

    <!-- Body -->
    <div class="d-flex flex-column flex-lg-row" style="min-height: 400px;">

      <!-- Notes List -->
      <div class="flex-1 pa-8">
        <div class="d-flex flex-column ga-4">
          <div
            v-for="note in mockNotes"
            :key="note.id"
            class="px-6 py-3 note-card"
            style="border-radius: 24px; border: 1px solid; transition: transform 0.2s, background 0.2s, box-shadow 0.2s;"
            :style="isDark
              ? 'background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.05);'
              : 'background: #f0f9ff; border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.06);'"
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
                  class="font-weight-black text-uppercase"
                  style="font-size: 10px; letter-spacing: 0.1em;"
                  :class="isDark ? 'text-blue-lighten-2' : 'text-blue-darken-1'"
                >
                  {{ note.author }}
                </span>
              </div>
              <span
                class="font-weight-bold"
                style="font-size: 10px;"
                :style="isDark ? 'color: rgba(255,255,255,0.3);' : 'color: #94a3b8;'"
              >
                {{ note.time }}
              </span>
            </div>
            <p
              class="text-sm"
              style="line-height: 1.6;"
              :style="isDark ? 'color: rgba(255,255,255,0.8);' : 'color: #475569;'"
            >
              {{ note.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div
        class="pa-8 d-flex flex-column ga-4"
        style="border: 1px solid;"
        :style="isDark
          ? 'width: 100%; border-color: rgba(255,255,255,0.05); background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); border-left: none;'
          : 'width: 100%; border-color: rgba(37,99,235,0.5); background: #f0f9ff; border-top: 1px solid rgba(37,99,235,0.5); border-left: none;'"
        :class="$vuetify?.display?.lgAndUp ? 'input-area-lg' : 'input-area-sm'"
      >
        <div class="d-flex flex-column ga-2" style="flex: 1;">
          <div class="d-flex justify-space-between align-center">
            <label
              class="font-weight-black text-uppercase"
              style="font-size: 10px; letter-spacing: 0.1em;"
              :style="isDark ? 'color: rgba(255,255,255,0.4);' : 'color: #94a3b8;'"
            >
              New Activity Entry
            </label>
            <div class="d-flex align-center ga-2 text-sm" :class="isDark ? 'text-white' : 'text-grey-darken-2'">
              Important <Star :size="16" />
            </div>
          </div>

          <textarea
            v-model="newNote"
            placeholder="Record call outcome or system update..."
            class="note-input w-100"
            :class="isDark ? 'note-input-dark' : 'note-input-light'"
            style="flex: 1; min-height: 180px; border-radius: 24px; border: 1px solid; padding: 24px; font-size: 0.875rem; resize: none; outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%;"
          />
        </div>

        <v-btn
          block
          color="blue-darken-1"
          variant="elevated"
          :disabled="!newNote"
          class="rounded-xl font-weight-black text-uppercase ga-3"
          style="padding: 20px; font-size: 0.7rem; letter-spacing: 0.2em; border-radius: 16px; box-shadow: 0 8px 24px rgba(37,99,235,0.3);"
        >
          <Send :size="16" class="mr-2" />
          Post Entry
        </v-btn>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MessageSquare, Send, Star } from 'lucide-vue-next'

const props = defineProps({
  theme: { type: String, default: 'light' },
})

const isDark = computed(() => props.theme === 'dark')
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
  width: 400px !important;
  border-left: 1px solid !important;
  border-top: none !important;
}

.note-input-dark {
  background: #0f172a;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff;
}
.note-input-dark::placeholder { color: rgba(255, 255, 255, 0.2); }
.note-input-dark:focus {
  border-color: rgba(59, 130, 246, 0.5) !important;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.note-input-light {
  background: #ffffff;
  border-color: #e2e8f0 !important;
  color: #1e293b;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}
.note-input-light::placeholder { color: #94a3b8; }
.note-input-light:focus {
  border-color: rgba(59, 130, 246, 0.5) !important;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}
</style>