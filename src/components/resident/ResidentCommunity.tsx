import React, { useState } from 'react';
import { 
  Megaphone, 
  Vote, 
  Calendar, 
  Briefcase, 
  ShoppingBag, 
  Search, 
  PawPrint, 
  Plus, 
  CheckCircle2, 
  Phone, 
  Star, 
  Clock, 
  MapPin, 
  Share2, 
  X,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';

export const ResidentCommunity: React.FC = () => {
  const { 
    announcements, 
    polls, 
    votePoll, 
    events, 
    toggleEventRsvp, 
    vendors, 
    marketplace, 
    postMarketplaceItem, 
    markMarketplaceSold,
    lostFound, 
    postLostFound, 
    resolveLostFound,
    pets, 
    addPet,
    residentUser, 
    language, 
    t 
  } = useCommunity();

  const [activeTab, setActiveTab] = useState<'notices' | 'polls' | 'events' | 'vendors' | 'market' | 'lostfound' | 'pets'>('notices');

  // Marketplace Sell Modal
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [marketTitle, setMarketTitle] = useState('');
  const [marketCategory, setMarketCategory] = useState<any>('Furniture');
  const [marketPrice, setMarketPrice] = useState<number>(2000);
  const [marketDesc, setMarketDesc] = useState('');

  // Lost & Found Modal
  const [showLfModal, setShowLfModal] = useState(false);
  const [lfType, setLfType] = useState<'Lost' | 'Found'>('Found');
  const [lfTitle, setLfTitle] = useState('');
  const [lfCategory, setLfCategory] = useState<any>('Keys');
  const [lfLocation, setLfLocation] = useState('');

  // Pet Registration Modal
  const [showPetModal, setShowPetModal] = useState(false);
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState<any>('Dog');
  const [petBreed, setPetBreed] = useState('');

  const handleCreateMarketItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketTitle.trim()) return;
    postMarketplaceItem({
      title: marketTitle,
      category: marketCategory,
      price: marketPrice,
      description: marketDesc
    });
    setMarketTitle('');
    setMarketDesc('');
    setShowMarketModal(false);
  };

  const handleCreateLf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lfTitle.trim()) return;
    postLostFound({
      type: lfType,
      title: lfTitle,
      category: lfCategory,
      location: lfLocation
    });
    setLfTitle('');
    setLfLocation('');
    setShowLfModal(false);
  };

  const handleCreatePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;
    addPet({
      petName,
      species: petSpecies,
      breed: petBreed,
      vaccinated: true
    });
    setPetName('');
    setPetBreed('');
    setShowPetModal(false);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Sub-navigation bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'notices', label: 'Notices', icon: <Megaphone className="w-3.5 h-3.5" /> },
          { id: 'polls', label: 'Polls', icon: <Vote className="w-3.5 h-3.5" /> },
          { id: 'events', label: 'Events', icon: <Calendar className="w-3.5 h-3.5" /> },
          { id: 'vendors', label: 'Services', icon: <Briefcase className="w-3.5 h-3.5" /> },
          { id: 'market', label: 'Market', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
          { id: 'lostfound', label: 'Lost & Found', icon: <Search className="w-3.5 h-3.5" /> },
          { id: 'pets', label: 'Pets', icon: <PawPrint className="w-3.5 h-3.5" /> },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition ${
              activeTab === item.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* 1. Announcements (Feature 8) */}
      {activeTab === 'notices' && (
        <div className="space-y-3">
          {announcements.map(notice => (
            <div
              key={notice.id}
              className={`p-4 rounded-2xl border transition ${
                notice.priority === 'pinned'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  notice.priority === 'pinned'
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {notice.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{notice.publishedAt}</span>
              </div>
              <h3 className="font-bold text-xs text-slate-900">
                {language === 'ta' && notice.tamilTitle ? notice.tamilTitle : notice.title}
              </h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {language === 'ta' && notice.tamilContent ? notice.tamilContent : notice.content}
              </p>
              <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100/80">
                Issued by {notice.author} · Scope: {notice.targetBlocks}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Polls & Voting (Feature 9) */}
      {activeTab === 'polls' && (
        <div className="space-y-3">
          {polls.map(poll => {
            const hasVoted = poll.votedUserIds.includes(residentUser.id);
            return (
              <div key={poll.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                    {hasVoted ? t('alreadyVoted') : 'Active Poll'}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 mt-1.5">
                    {language === 'ta' && poll.tamilQuestion ? poll.tamilQuestion : poll.question}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{poll.description}</p>
                </div>

                {/* Poll Options */}
                <div className="space-y-2">
                  {poll.options.map(opt => {
                    const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                    return (
                      <button
                        key={opt.id}
                        disabled={hasVoted}
                        onClick={() => votePoll(poll.id, opt.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition relative overflow-hidden ${
                          hasVoted
                            ? 'bg-slate-50 border-slate-200 cursor-default'
                            : 'bg-white hover:border-emerald-500 hover:bg-emerald-50/20 border-slate-200'
                        }`}
                      >
                        {/* Fill Progress Bar */}
                        {hasVoted && (
                          <div
                            className="absolute inset-y-0 left-0 bg-emerald-100/60 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        )}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="font-medium text-slate-800">
                            {language === 'ta' && opt.tamilText ? opt.tamilText : opt.text}
                          </span>
                          {hasVoted && (
                            <span className="font-mono font-bold text-emerald-800 text-[11px]">
                              {pct}% ({opt.votes})
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Total votes: {poll.totalVotes}</span>
                  <span>Ends: {poll.endDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Events & RSVP (Feature 10) */}
      {activeTab === 'events' && (
        <div className="space-y-3">
          {events.map(evt => (
            <div key={evt.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {evt.category}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 mt-1">
                    {language === 'ta' && evt.tamilTitle ? evt.tamilTitle : evt.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {evt.date}
                    </span>
                    <span>·</span>
                    <span className="font-mono">{evt.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleEventRsvp(evt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    evt.hasRsvpd
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {evt.hasRsvpd ? 'Joined ✓' : 'RSVP / Join'}
                </button>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {evt.description}
              </p>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {evt.location}
                </span>
                <span className="font-medium text-slate-700">
                  {evt.rsvps.length} Families RSVP'd
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Trusted Local Services (Feature 12) */}
      {activeTab === 'vendors' && (
        <div className="space-y-3">
          <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 text-xs text-emerald-800">
            <strong>Association Verified Vendors:</strong> Police verified professionals with gate entry passes.
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {vendors.map(v => (
              <div key={v.id} className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-slate-900">{v.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {v.trade}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {v.rating} ({v.reviewCount} reviews)
                    </span>
                    <span>·</span>
                    <span>{v.yearsInCommunity} yrs in society</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{v.availableDays}</div>
                </div>

                <a
                  href={`tel:${v.phone}`}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition"
                  title="Call Vendor"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Community Marketplace (Feature 13) */}
      {activeTab === 'market' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Verified resident classifieds</span>
            <button
              onClick={() => setShowMarketModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Item</span>
            </button>
          </div>

          <div className="space-y-3">
            {marketplace.map(item => (
              <div key={item.id} className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.category} · {item.condition}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                  <span className="text-sm font-extrabold font-mono text-emerald-700">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    Seller: {item.sellerName} ({item.sellerFlat})
                  </span>
                  {item.sellerFlat === residentUser.flatNumber && item.status === 'Available' ? (
                    <button
                      onClick={() => markMarketplaceSold(item.id)}
                      className="text-xs text-amber-700 font-bold hover:underline"
                    >
                      Mark as Sold
                    </button>
                  ) : item.status === 'Sold' ? (
                    <span className="text-[10px] font-bold text-slate-400">SOLD</span>
                  ) : (
                    <a
                      href={`tel:${item.sellerPhone}`}
                      className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-xs font-medium"
                    >
                      Contact Seller
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Lost & Found (Feature 21) */}
      {activeTab === 'lostfound' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Community lost and found board</span>
            <button
              onClick={() => setShowLfModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Report Item</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {lostFound.map(lf => (
              <div key={lf.id} className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      lf.type === 'Found' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {lf.type.toUpperCase()}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900">{lf.title}</h4>
                  </div>
                  <span className={`text-[10px] font-bold ${lf.status === 'Resolved' ? 'text-slate-400' : 'text-amber-700'}`}>
                    {lf.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{lf.description}</p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span>Location: {lf.location}</span>
                  {lf.status === 'Open' && (
                    <button
                      onClick={() => resolveLostFound(lf.id)}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Pet Registry (Feature 22) */}
      {activeTab === 'pets' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Registered community pets</span>
            <button
              onClick={() => setShowPetModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Pet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {pets.map(pet => (
              <div key={pet.id} className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-slate-900">{pet.petName}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                      {pet.species} · {pet.breed}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Flat {pet.flatNumber} · Owner: {pet.ownerName}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Vaccination valid till {pet.vaccineDueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Marketplace Item */}
      {showMarketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">List Item for Sale</h3>
              <button onClick={() => setShowMarketModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateMarketItem} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Item Title *</label>
                <input
                  required
                  value={marketTitle}
                  onChange={e => setMarketTitle(e.target.value)}
                  placeholder="e.g. Study Chair with cushion"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={marketPrice}
                    onChange={e => setMarketPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <select
                    value={marketCategory}
                    onChange={e => setMarketCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Cycles & Fitness">Cycles & Fitness</option>
                    <option value="Kids & Toys">Kids & Toys</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={marketDesc}
                  onChange={e => setMarketDesc(e.target.value)}
                  placeholder="Condition, pickup instructions..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-bold"
              >
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Lost and Found */}
      {showLfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Report Lost or Found</h3>
              <button onClick={() => setShowLfModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateLf} className="space-y-3 pt-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLfType('Found')}
                  className={`py-2 rounded-xl font-bold border ${lfType === 'Found' ? 'bg-emerald-600 text-white' : 'bg-slate-50'}`}
                >
                  I Found An Item
                </button>
                <button
                  type="button"
                  onClick={() => setLfType('Lost')}
                  className={`py-2 rounded-xl font-bold border ${lfType === 'Lost' ? 'bg-rose-600 text-white' : 'bg-slate-50'}`}
                >
                  I Lost An Item
                </button>
              </div>
              <div>
                <label className="font-semibold block mb-1">Item Name *</label>
                <input
                  required
                  value={lfTitle}
                  onChange={e => setLfTitle(e.target.value)}
                  placeholder="e.g. Scooter Key with red strap"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Location Found / Lost</label>
                <input
                  value={lfLocation}
                  onChange={e => setLfLocation(e.target.value)}
                  placeholder="e.g. Block B Lift Lobby"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold"
              >
                Submit Notice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Pet Registration */}
      {showPetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Register Resident Pet</h3>
              <button onClick={() => setShowPetModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreatePet} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Pet Name *</label>
                <input
                  required
                  value={petName}
                  onChange={e => setPetName(e.target.value)}
                  placeholder="e.g. Rocky"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Species</label>
                  <select
                    value={petSpecies}
                    onChange={e => setPetSpecies(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Breed</label>
                  <input
                    value={petBreed}
                    onChange={e => setPetBreed(e.target.value)}
                    placeholder="e.g. Beagle"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-bold"
              >
                Register Pet
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
