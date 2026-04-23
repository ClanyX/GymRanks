<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
    import { EnvelopeOpenOutline } from 'flowbite-svelte-icons';
</script>

<div class="max-w-md mx-auto p-6 mt-20">
    <Card class="dark:bg-gray-900 border-gray-800 text-center p-6 space-y-6">
        <div class="bg-primary-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <EnvelopeOpenOutline class="w-10 h-10 text-primary-500 animate-bounce" />
        </div>
        
        <h1 class="text-3xl font-black italic uppercase dark:text-white tracking-tighter">
            Zkontroluj si <span class="text-primary-600">Mail!</span>
        </h1>
        
        <p class="text-gray-400 leading-relaxed">
            Na tvou adresu jsme poslali potvrzovací odkaz. Klikni na něj, ať můžeme tvé rekordy oficiálně zapsat do žebříčku.
        </p>

        <div class="pt-4 border-t border-gray-800">
            <p class="text-xs text-gray-500 mb-4">Nedorazilo nic? Zkontroluj složku SPAM.</p>
            <Button outline href="/login" color="dark" class="w-full font-bold uppercase italic">
                Zpět na přihlášení
            </Button>
        </div>
    </Card>
</div>